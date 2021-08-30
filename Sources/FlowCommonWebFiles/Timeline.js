/**
* A Timeline represents a set of animations that can be applied to a DOM element.
* The general structure of the Timeline class is a pattern that represents a generic way of referencing elements and resources.
* This class provides placeholder methods, ince an element can have any number and structure of subelements, each of which may or may not be animated.
* 
* TODO: If necessary, convert this class to define functions as part of its prototype, then have generated timelines inherit from this class
*/

class Timeline {
    /**
    * @constructor
    *
    * @param {HTMLElement} rootElement
    *   Root Element of the DOM containing the elements that will be animated in this timeline.
    *
    * @param {String} resourcesPath
    *   The path pointing to the root of the Timeline folder.
    */
    constructor(rootElement, elementID, resourcesPath) {
        this.rootElement = rootElement;
        this.elementID = elementID;
        this.resourcesPath = resourcesPath;
        this.imagesFolderPath = resourcesPath + "/img";
        this.loadFillImages();
    }

    /**
    * Returns the timeline's duration in milliseconds.
    */
    get duration() { 
      return 0 
    }

    /**
    * Loads fill images for shapes
    */
    loadFillImages() {
      // Any images used as fills on shapes should be created here
      // For example:
      // let pattern = this.rootElement.getElementById("shapeID-fillImage")
      // pattern.innerHTML = `<image ... href="${this.imagesFolderPath}/image.png" />`
      // pattern.setAttribute(...);
    }
  
    /**
     * Loads all animations for svgs in the current timeline 
     */
    loadSVGAnimations() {
        this.loadSVGShapeAnimations()
        this.loadSVGShapeMaskAnimations()
    }

    /**
    * Loads all shape animations
    */
    loadSVGShapeAnimations() {
        // Path defs, and animations should be created here
        // For example:
        // let path = this.rootElement.getElementById("pathID")
        // path.d = "M0,...zM0"
        // path.innerHTML = `<animate .../>`

        // Gradient defs should be created here
        // let defs = this.rootElement.getElementById("fillID")
        // defs.innerHTML = `<stop ... /> <animate .../>`
    } 

    /**
    * Loads all shape mask animations
    */
    loadSVGShapeMaskAnimations() {
        // Insert SVG animations for mask paths here
        // For example:
        // this.rootElement.querySelector("#shape-maskID").innerHTML = `<path ...><animate .../></path>`
    }

    /**
    * @return
    * Returns the list of svg shapes that are animated in this timeline.
    */
    get allShapes() {
        return [
            //this.rootElement.querySelector(`#shapeID .shape-svg`),
        ]
    }

    /**
     * A simple, visually unnoticable animation to fix a rendering bug with Safari
     */
    artboardAnimation() {
        // Workaround for Safari bug
        return this.rootElement.querySelector(`${this.elementID}.flow-artboard`).animate({
        backgroundPosition: ['0px', '1px'],
        }, {
            delay: 0,
            duration: 1000,
        });
    }

    /**
    * Property track animations should be added here.
    * 
    * Track animations are keyframe animations that represent the entire state of an element's property throughout the entire timeline.
    * Animations should be normalized from 0 to 1.
    * 
    * shapeWidthTrack() {
    *   const element = this.rootElement.querySelector(`#shapeID .shape`);
    *   return element.animate({
    *     width: ['100px', '200px'],
    *     easing: ["ease-in-out"],
    *     offset: [0, 1],
    *   }, {
    *     duration: this.duration,
    *     composite: 'replace',
    *     fill: 'forwards'
    *   })
    * }
    * 
    * In the case of animations that do not start at 0, or end at 1, there should be values at 0 and 1, for example
    * 
    * shapeWidthTrack() {
    *   const element = this.rootElement.querySelector(`#shapeID .shape`);
    *   return element.animate({
    *     width: ['100px', '100px', '200px', '200px'],
    *     easing: ["linear","ease-in-out","linear"],
    *     offset: [0, 0.25, 0.75, 1],
    *   }, {
    *     duration: this.duration,
    *     composite: 'replace',
    *     fill: 'forwards'
    *   })
    * }
    */

    /**
    * Creates and returns all animations for this timeline.
    */
    createAllAnimations() {
        return [
            this.artboardAnimation(),
            // this.shapeWidthTrack()
        ].flat()
    }
}

Object.freeze(Timeline)