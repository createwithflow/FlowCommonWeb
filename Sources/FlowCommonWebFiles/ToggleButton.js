/**
 * A button that can be toggled on and off with
 * forward and reverse animations. The forward and reverse animations are triggered when
 * transitioning from the off -> on and on -> off states respectively.
 */
class ToggleButton {
  /**
   * @constructor
   *
   * @param {Timeline} forwardTimeline
   *  Animation played when button transitions from off to on.
   *
   * @param {Timeline} reverseTimeline
   *  Animation played when button transitions from on to off.
   *
   * @param {String} timer
   *  The HTML Element for the Timer.
   *
   * @param {Boolean} state
   *  The initial state of the button.
   *
   * @param {function: () -> Void} callback
   * A callback function passed to the player that runs upon animation completion.
   * This callback does not take in any parameters.
   */
  constructor(forwardTimeline, reverseTimeline, timer, state, callback) {
    this.callback = callback;
    this.state = state;
    this.timer = timer;
    this.forwardTimeline = forwardTimeline;
    this.reverseTimeline = reverseTimeline;
    this.player = new Player(forwardTimeline, timer, false, 0, callback);
    this.setState(this.state);
  }

  /**
   * @return {Boolean}
   * Returns true if the `self` is currently being animated, otherwise returns false.
   */
  isAnimating() {
    return this.player.isPlaying();
  }

  /**
   * Sets the state of the `self` to `state`.
   *
   * @param {Boolean} state
   *  The new state of `self`.
   *
   */
  setState(state, time = 0) {
    this.player.timeline = this.state
      ? this.reverseTimeline
      : this.forwardTimeline;
    this.state = state;
    this.player.currentTime = time;
  }

  /**
   * Toggles the state of `self` and animates the state transition if `animated` is true.
   * Then calls the player's call back function.
   *
   * @param {Boolean} animated
   *  Determines whether or not to animate the state transtion of `self`.
   */
  toggle(animated) {
    if (this.isAnimating()) {
      const newTime = this.player.duration - this.player.currentTime;
      this.setState(!this.state, newTime);
    } else {
      this.setState(!this.state);
    }

    if (animated) {
      this.player.play();
    }
  }
}

/**
 * The function used to create new instances of `ToggleButton`.
 *
 * @param {String} rootID
 *  The id of the element for which the new instance of ToggleButton is created.
 *
 * @param {function: () -> Void} callback
 *  A callback function which is executed when the toggle button is clicked.
 *
 * @param {String} resourcesPath
 *  The path pointing to the root of the Timeline folder.
 *
 * @param {Timeline} ForwardTimeline
 *  The type of animation played when button transitions from on to off.
 *
 * @param {Timeline} ReverseTimeline
 *  The type of animation played when button transitions from on to off.
 *
 * @return {function}
 *  A callback function which is executed when the toggle button is clicked.
 */

// eslint-disable-next-line no-unused-vars
const createToggleButton = function createToggleButton(
  rootID, callback, elementID, resourcesPath, ForwardTimeline, ReverseTimeline) {
  const shadowDomContainer = document.getElementById(rootID);
  const { shadowRoot } = shadowDomContainer;
  const timer = shadowRoot.getElementById('timerID');

  // ID of the shadow dom container, do not change.
  const container = shadowRoot.getElementById('flowComponentContainerID');
  container.setAttribute('onclick', `${rootID}.toggle(true)`);

  const forwardTimeline = new ForwardTimeline(shadowRoot, elementID, resourcesPath);
  const reverseTimeline = new ReverseTimeline(shadowRoot, elementID, resourcesPath);
  return new ToggleButton(
    forwardTimeline,
    reverseTimeline,
    timer,
    false,
    callback);
};
