/**
 * Class used for driving animations.
 */
class Player {
  /**
   * @constructor
   *
   * @param {Timeline} timeline
   *  Animation played when the transition is triggered.
   *
   * @param {String} timer
   *  The HTML Element or the HTML Element ID for the Timer.
   *
   * @param {Boolean} loop
   *  True if the animation should restart upon completion false otherwise.
   *
   * @param {Boolean} delay
   *  The time in milliseconds before the animation starts.
   *
   * @param {function: () -> Void} callback
   * A callback function passed to the player that runs upon animation completion.
   * This callback does not take in any parameters.
   */
  constructor(timeline, timer, loop, delay, callback) {
    this.delay = delay;
    if (typeof timer === "string" || timer instanceof String) {
      this.timer = document.getElementById(timer);
    } else {
      this.timer = timer;
    }
    this.loop = loop;
    this.timeline = timeline;
    this.callback = callback;
    this.setOnFinishCallback();
  }

  /**
   * @return
   * Returns the value of timeline for `self`.
   */
  get timeline() {
    return this._timeline;
  }

  /**
   * @set
   * Sets the timeline of self to timeline, pauses the playback and sets the current time to zero.
   *
   * @param timeline
   * Animation to be played.
   *
   */
  set timeline(timeline) {
    if (this._timeline != null) {
      this.pause();
    }
    this._timeline = timeline;
    this._timeline.loadFillImages();

    if (this._timeline === null) {
      this.timingAnimation = null;
      this.currentTime = 0;
      this.shouldPlay = false;
    } else {
      this.timingAnimation = this.timer.animate(
        {},
        this.timeline.duration + this.delay
      );
      this.timeline.loadSVGAnimations();
      this.timingAnimation.currentTime = 0;
      this.timingAnimation.pause();

      this.animations = this.timeline.createAllAnimations();
      this.shouldPlay = true;
      this.pause();
      this.setOnFinishCallback();
    }
  }

  /**
   * @return
   * Returns the duration of the timeline of self, or 0 if timeline is null.
   */
  get duration() {
    return this.timeline === null ? 0 : this.timeline.duration;
  }

  /**
   * @return
   * Returns the currentTime of self, or null if timeline is null.
   */
  get currentTime() {
    return this.timingAnimation === null ? 0 : this.timingAnimation.currentTime;
  }

  /**
   * @set
   * Sets the currentTime of self.
   *
   * @param time
   * A numeric value representing time in milliseconds.
   */
  set currentTime(time) {
    if (this.timeline === null || this.timingAnimation === null) {
      return;
    }

    for (const animation of this.animations) {
      animation.currentTime = time;
    }
    for (const shape of this.timeline.allShapes) {
      shape.setCurrentTime(time / 1000);
    }
    this.timingAnimation.currentTime = time;
  }

  /**
   * Plays the animation if the timeline that belongs to `self` is not null
   * and the animation is not currently playing.
   */
  play() {
    if (this.timeline === null || this.isPlaying() == true) {
      return;
    }

    this.timingAnimation.play();
    for (const animation of this.animations) {
      animation.play();
    }
    for (const shape of this.timeline.allShapes) {
      var t = shape.getCurrentTime() % this.timeline.duration;
      shape.setCurrentTime(t);
      shape.unpauseAnimations();
    }
  }

  /**
   * @return
   * Returns true if self is currently playing an animation and false otherwise.
   */
  isPlaying() {
    if (this.timingAnimation == null) {
      return false;
    }
    return this.timingAnimation.playState == "running";
  }

  /**
   * Pauses the animation being played by self.
   */
  pause() {
    if (this.timeline === null || this.timingAnimation === null) {
      return;
    }

    this.timingAnimation.pause();
    for (const animation of this.animations) {
      animation.pause();
    }
    for (const shape of this.timeline.allShapes) {
      shape.pauseAnimations();
    }
  }

  /**
   * Stops the animation.
   */
  stop() {
    this.shouldPlay = false;
    this.pause();
    this.currentTime = 0;
  }

  //------------------
  // interface updates
  //------------------

  /**
   * Sets the callback function that will be run at the end of each animation.
   */
  setOnFinishCallback() {
    if (this.timingAnimation == null) {
      return;
    }
    this.timingAnimation.onfinish = () => {
      if (this.loop == true) {
        this.currentTime = 0;
      } else {
        this.pause();
      }
      if (this.callback !== null) this.callback();
    };
  }

  //---------------
  // helper methods
  //---------------

  /**
   * Converts a numeric value representing a time in milliseconds into a string.
   */
  static convertTimeToString(milliseconds) {
    var date = new Date(null);
    date.setMilliseconds(milliseconds);
    return date.toISOString().substr(14, 8);
  }
}

function createPlayer(
  timeline,
  timerID,
  loop,
  delay,
  callback,
  rootID,
  resourcesPath
) {
  let shadowDomContainer = document.getElementById(rootID);
  let shadowRoot = shadowDomContainer.shadowRoot;
  let timer = shadowRoot.getElementById(timerID);
  let forwardTimeline = new timeline(shadowRoot, resourcesPath);
  return new Player(forwardTimeline, timer, loop, delay, callback);
}