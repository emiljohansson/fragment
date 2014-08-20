function Animation() {
	Plugin.apply(this);
}
Animation.prototype = Object.create(Plugin.prototype);

/**
 * Appends the plugin onto the element.
 *
 * @param Element element
 * @return undefined
 */
Animation.prototype._initElement = function(element) {
	Plugin.prototype._initElement.call(this, element);
    element.animation = {
        expand: function(width, height) {
            $(element.getElement()).animate({
                width: width,
                height: height
            }, 1000, "linear");
        },
		marginLeft: function(val) {
			$(element.getElement()).animate({
				marginLeft: val
			}, 1000, "linear");
		},
        stop: function() {
            $(element.getElement()).stop();
        }
    };
};

/**
 * Appends an animation to the element object.
 *
 * @param object properties
 * @return undefined
 */
Animation.prototype.append = function(/*properties*/) {
	//
};

/**
* Return the percentage of the bar.
*
* @return Number
*/
Animation.prototype.percent = function() {
	var w = this._element.getElement().style.width;
	return w.substring(0, w.length-1);
};

fragment.animation = new Animation();
