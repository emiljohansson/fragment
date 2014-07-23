/**
 * Appends drag and drop abilities to an element.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['./Plugin', 'jquery'], function(Plugin, $) {
	'use strict';

	/**
	 * Constructor method.
	 */
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

	return new Animation();
});
