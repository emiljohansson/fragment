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
	function IntroState() {
        DisplayState.apply(this);
		var container = new Container();
		container.appendTo(this);
        var label = new Element();
        label.html('Welcome, to play...');
        label.appendTo(container);
	}
    IntroState.prototype = Object.create(DisplayState.prototype);

    /**
     * Initializes the state.
     *
     * @return undefined
     */
    IntroState.prototype.init = function() {
        //
    };

    return IntroState;
});
