/**
 * ...
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([
	'fragment/state/DisplayState',
	'fragment/dom/Element',
	'fragment/dom/Container'
], function(DisplayState, Element, Container) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function LoadingState() {
		DisplayState.apply(this);
		var container = new Container();
		container.appendTo(this);
		var label = new Element();
		label.html('Loading');
		label.appendTo(container);
	}
	LoadingState.prototype = Object.create(DisplayState.prototype);

	/**
	 * Initializes the state.
	 *
	 * @return undefined
	 */
	LoadingState.prototype.init = function() {
		//
	};

	return LoadingState;
});
