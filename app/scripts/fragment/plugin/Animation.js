/**
 * Appends drag and drop abilities to an element.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['./Plugin', 'jquery'], function(Plugin, jquery) {
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
	Animation.prototype.initElement = function(element) {
		Plugin.prototype.initElement.call(this, element);
		//$(element.getElement()).draggable();
	};

	/**
	 * Appends an animation to the element object.
	 *
	 * @param object properties
	 * @return undefined
	 */
	Animation.prototype.append = function(properties) {
		//
	};

	return new Animation();
});