/**
* Class representing the Track of animations for a specific property of an element. A Track contains
* a list of animations that will used manipulate a specific property of an HTML Element. 
*
* Made with Flow
*/
class Track {
  /**
   * @constructor
   *
   * @param {String} property
   *  The property of an HTML Element the animations belonging to `self` will be manipulating.
   *
   * @param {Array<String>} values
   *  A list of values the property will be at a specific point in time.
   *
   * @param {Array<String>} timingFunctions
   *  A list of timing functions to be used with each animation in `self`.
   *
   * @param {Array<Number>} times
   *  A list of pairs of times representing the starting and ending times of each animation in `self`.
   *  
   * @param {HTMLElement} element
   *  The HTML Element the animation will be manipulating.
   *
   * @param {Array<Animation>} animations
   *  A list of animations belonging to `self`.
   */
  constructor(property, values, timingFunctions, times, element) {
    this.property = property;
    this.values = values;
    this.timingFunctions = timingFunctions;
    this.times = times;
    this.element = element;
    this.animations = this.createAllAnimations();
  }

  /**
    * @return
    * Returns the list of animations for `self`.
    */
  createAllAnimations() {
    let animations = [];
    for (const [index, timingFunction] of this.timingFunctions.entries()) {
        let from = this.values[index];
        let to = this.values[index + 1];
        let startTime = this.times[index];
        let endTime = this.times[index + 1];
        let id = `${this.element}${this.property}${index}`
      animations.push(
        new Animation(this.element, this.property, from, to, id, startTime, endTime, timingFunction)
      );
    }
    return animations;
  }
}