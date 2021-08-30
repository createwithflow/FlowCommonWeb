/**
 * The Player is a generic class for handling the loading, unloading, and playback of a `Timeline` to be associated with a DOM element. A player must be able to construct a timer – using an existing DOM element or ID – which handles timing and the execution of a callback on completion.
 */
class Player {
  /**
   * @constructor
   *
   * @param {Timeline} timeline
   *  Animation played when the transition is triggered.
   *
   * @param {String} timer
   *  The HTML Element or the HTML Element ID to be used for handling the timer (i.e. timing animation) of `self`.
   *
   * @param {Boolean} loop
   *  This property specifies that the animation should repeat upon completion.
   *
   * @param {Boolean} delay
   *  The number of milliseconds to delay the start of playback.
   *
   * @param {function: () -> Void} callback
   * A callback function passed to the player that runs upon animation completion.
   * This callback does not take in any parameters.
   */
  constructor(timeline, timer, loop, delay, callback) {
    this.delay = delay;
    if (typeof timer === 'string' || timer instanceof String) {
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
   * @return {Timeline}
   * Returns the current timeline for `self`.
   */
  get timeline() {
    return this._timeline;
  }

  /**
   * @set
   * Sets the timeline of `self` to `timeline`. When this variable is set, the player pauses playback then sets the new value. If the new value is `null` the current timing animation is removed, and default values are set in anticipation of a new timeline. If the new value is not `null` the timeline is prepped for playback.
   *
   * @param {Timeline} timeline
   * The timeline to be controlled by `self`.
   *
   */
  set timeline(timeline) {
    // Work around for Safari bug. More detail provided in the
    // comment above the `cancelAnimations` function in this file.
    this.cancelAnimations();

    // Pause the current timeline, if it exists
    if (this._timeline != null) {
      this.pause();
    }

    this._timeline = timeline;

    // Prepare `self` to receive a new timeline, or initiate playback.
    if (this._timeline === null) {
      this.timingAnimation = null;
      this.currentTime = 0;
      this.shouldPlay = false;
    } else {
      //Set up the timing animation, which is used to track the current playback time
      this.timingAnimation = this.timer.animate(
        {},
        this.timeline.duration + this.delay);
      this.timingAnimation.currentTime = 0;
      this.timingAnimation.pause();

      //Load all images, shapes, animations
      this.timeline.loadFillImages();
      this.timeline.loadSVGAnimations();
      this.animations = this.timeline.createAllAnimations();

      //Prepare for playback
      this.shouldPlay = true;
      this.pause();
      this.setOnFinishCallback();
    }
  }

  /**
   * @return {Number}
   * Returns the duration of the `timeline` of `self`, or `0` if timeline is `null`.
   */
  get duration() {
    return this.timeline === null ? 0 : this.timeline.duration;
  }

  /**
   * @return {Number}
   * Returns the current playback time of `self`, or `0` if `timeline` is `null`.
   */
  get currentTime() {
    return this.timingAnimation === null ? 0 : this.timingAnimation.currentTime;
  }

  /**
   * @set
   * Sets the current playback time (in milliseconds) of `self`. This value is propagated to all animations in the current timeline.
   *
   * @param {Number} time
   * A numeric value representing time in milliseconds.
   */
  set currentTime(time) {
    // There should always be both a timeline and a timing animation, if not do nothing
    if (this.timeline === null || this.timingAnimation === null) {
      return;
    }

    // Set the time for all animations in the timeline
    this.animations.forEach((animation) => {
      animation.currentTime = time;
    });

    // Set the time for all shapes (SVG/SMIL) in the timeline
    this.timeline.allShapes.forEach((shape) => {
      shape.setCurrentTime(time / 1000);
    });

    // Set the time for the timing animation
    this.timingAnimation.currentTime = time;
  }

  /**
   * Work around for Safari. When switching from one timeline to
   * another Safari will jump to a random point in the first
   * timeline unless the effect target of each animation is set to null.
   * This is to ensure that Safari cannot access any animation from the previous
   * timeline.
   */
  cancelAnimations() {
    if (this.animations === undefined || this.animations === null) { return; }
    this.animations.forEach((animation) => {
      animation.effect.target = null;
    });
    this.animations = [];
  }

  /**
   * Plays the current timeline for `self`. If the player is currently playing, or the current timeline is `null` this function does nothing.
   */
  play() {
    if (this.timeline == null || this.isPlaying() === true) {
      return;
    }

    this.timingAnimation.play();
    this.animations.forEach((animation) => {
      animation.play();
    });


    this.timeline.allShapes.forEach((shape) => {
      const t = shape.getCurrentTime() % this.timeline.duration;
      shape.setCurrentTime(t);
      shape.unpauseAnimations();
    });
  }

  /**
   * @return {Boolean}
   * Returns true if self is currently playing an animation and false otherwise.
   */
  isPlaying() {
    if (this.timingAnimation == null) {
      return false;
    }
    return this.timingAnimation.playState === 'running';
  }

  /**
   * Pauses the animation being played by self.
   */
  pause() {
    if (this.timeline === null || this.timingAnimation === null) {
      return;
    }

    this.timingAnimation.pause();
    this.animations.forEach((animation) => {
      animation.pause();
    });
    this.timeline.allShapes.forEach((shape) => {
      shape.pauseAnimations();
    });
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
      if (this.loop === true) {
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
    const date = new Date(null);
    date.setMilliseconds(milliseconds);
    return date.toISOString().substr(14, 8);
  }
}

// eslint-disable-next-line no-unused-vars
function createPlayer(
  Timeline,
  timerID,
  loop,
  delay,
  callback,
  rootID,
  elementID,
  resourcesPath) {
  const shadowDomContainer = document.getElementById(rootID);
  const { shadowRoot } = shadowDomContainer;
  const timer = shadowRoot.getElementById(timerID);
  const forwardTimeline = new Timeline(shadowRoot, elementID, resourcesPath);
  return new Player(forwardTimeline, timer, loop, delay, callback);
}
