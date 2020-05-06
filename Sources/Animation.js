/**
* Class representing an Animation. The Animation class contains all the logic necessary
* to create and control instances of animations.
*
* Made with Flow
*/

// eslint-disable-next-line no-unused-vars
class Animation {
  /**
   * @constructor
   *
   * @param {HTMLElement} element
   *  The HTML Element the animation will be manipulating.
   *
   * @param {String} property
   *  The property of the HTML Element the animation will be manipulating.
   *
   * @param {String} from
   * The current value of the property being animated.
   *
   * @param {String} to
   *  The value of the property being animated at time duration of `self`.
   *
   * @param {Number} startTime
   *  The time the animation will begin.
   *
   * @param {Array<Animation>} endTime
   *  The time the animation will end.
   *
   * @param {String} timingFunction
   *  The timing function to be used by `self`.
   */
  constructor(
    element,
    property,
    from,
    to,
    id,
    startTime,
    endTime,
    timingFunction,
  ) {
    this.element = element;
    this.property = property;
    this.from = from;
    this.to = to;
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.timingFunction = timingFunction;
    this.webAnimation = this.createWebAnimation();
  }

  /**
    * @return {Animation}
    * Returns an animation to be interpreted by the `Web Animations API`. https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API.
    */
  createWebAnimation() {
    const keyframe = {
      [this.property]: [`${this.from}`, `${this.to}`],
    };
    const options = {
      id: this.id,
      delay: this.startTime,
      duration: this.duration(),
      easing: this.timingFunction,
      composite: 'add',
      fill: 'forwards',
    };
    return this.element.animate(keyframe, options);
  }

  /**
    * @return {Number}
    * Returns the duration of `self`.
    */
  duration() {
    const duration = this.endTime - this.startTime;
    switch (this.timingFunction) {
      case 'steps(1,end)':
        return 1;
      case 'steps(1)':
        return duration / 2;
      case 'step-end':
        return duration - 1;
      default:
        return duration;
    }
  }

  /**
   * Plays the animation if the `shouldPlay` is `true`.
   */
  play() {
    const shouldPlay = this.currentTime < this.endTime;
    if (shouldPlay) {
      this.webAnimation.play();
    }
  }

  /**
   * Pauses the animation being played by `self`.
   */
  pause() {
    this.webAnimation.pause();
  }

  /**
    * @return {String}
    * Returns the current `playState` of `self`.
    */
  get playState() {
    return this.webAnimation.playState;
  }

  /**
   * @set
   * Sets the currentTime of `self`.
   *
   * @param {Number} time
   * A numeric value representing time in milliseconds.
   */
  set currentTime(time) {
    this.webAnimation.currentTime = time;
  }

  /**
   * @return {Number}
   * Returns the currentTime of `self`.
   */
  get currentTime() {
    return this.webAnimation.currentTime;
  }
}
