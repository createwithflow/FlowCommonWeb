/**
 * A hover element that can be toggled on and off with
 * forward and reverse animations. The forward and reverse animations are triggered when
 * transitioning from the off -> on and on -> off states respectively.
 */
class HoverElement {
  /**
   * @constructor
   *
   * @param {Timeline} forwardTimeline
   *  Animation played when hover element transitions from off to on.
   *
   * @param {Timeline} reverseTimeline
   *  Animation played when hover element transitions from on to off.
   *
   * @param {String} timer
   *  The HTML Element for the Timer.
   *
   * @param {Boolean} loop
   *  True if the animation should restart upon completion false otherwise.
   *
   * @param {Boolean} state
   *  The initial state of the button.
   *
   * @param {function: () -> Void} callback
   * A callback function passed to the player that runs upon animation completion.
   * This callback does not take in any parameters.
   */
  constructor(forwardTimeline, reverseTimeline, timer, loop, state, callback) {
    this.callback = callback;
    this.state = state;
    this.timer = timer;
    this.forwardTimeline = forwardTimeline;
    this.reverseTimeline = reverseTimeline;
    this.player = new Player(forwardTimeline, timer, loop, 0, callback);
  }

  /**
   * @return
   * Returns true if the `self` is currently being animated, otherwise returns false.
   */
  isAnimating() {
    return this.player.isPlaying();
  }

  /**
   * Plays the forward timeline associated with the hover element.
   * This method should be invoked when the mouse enters the bounds of the hover element.
   */
  enter() {
    if (this.isAnimating()) {
      this.setReverseTimeline(this.forwardTimeline);
    } else {
      this.setTimeline(this.forwardTimeline)
    }
  }

  /**
   * Plays the reverse timeline associated with the hover element.
   * This method should be invoked when the mouse leaves the bounds of the hover element.
   */
  exit() {
    this.setReverseTimeline(this.reverseTimeline);
  }

  /**
   * Plays the given `timeline` from the point in the time the previous timeline was stopped. 
   * 
   * @param {timeline} timeline 
   * The next timeline to play.
   */
  setTimeline(timeline, time = 0) {
    this.player.timeline = timeline;
    this.player.currentTime = time;
    this.player.play();
  }  

  setReverseTimeline(timeline) {
    let nextTime = this.player.duration - this.player.currentTime;
    this.setTimeline(timeline, nextTime);
  }
}

/**
 * Used when element is a component
 */
function createHoverElement(rootID, callback, resourcesPath, ForwardTimeline, ReverseTimeline) {
  let shadowDomContainer = document.getElementById(rootID);
  let shadowRoot = shadowDomContainer.shadowRoot;
  let timer = shadowRoot.getElementById("timerID");

  //ID of the shadow dom container, do not change.
  let container = shadowRoot.getElementById("flowComponentContainerID");
  
  container.setAttribute("onmouseenter", `${rootID}.enter()`)
  container.setAttribute("onmouseleave", `${rootID}.exit()`)
  let forwardTimeline = new ForwardTimeline(shadowRoot, resourcesPath);
  let reverseTimeline = new ReverseTimeline(shadowRoot, resourcesPath);
  return new HoverElement(
    forwardTimeline,
    reverseTimeline,
    timer,
    false,
    false,
    callback
  );
}