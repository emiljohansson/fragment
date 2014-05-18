/**
* ...
*
* https://github.com/emiljohansson/fragment
* @author Emil Johansson <emiljohansson.se@gmail.com>
*/
define([
	'fragment/dom/Element'
], function(Element) {
	'use strict';

	/**
	* Constructor method.
	*/
	function DisplayState() {
		Element.apply(this);
		this._element.setAttribute('class', 'fragment-displayState');
	}
	DisplayState.prototype = Object.create(Element.prototype);

	/**
	* Initializes the state.
	*
	* @return undefined
	*/
	DisplayState.prototype.init = function() {};

	/**
	* Initializes the state.
	*
	* @return undefined
	*/
	DisplayState.prototype.dispose = function() {
		console.log('parent:', this.parent);
	};

	return DisplayState;
});
