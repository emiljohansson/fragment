/**
* ...
*
* @author Emil Johansson <emiljohansson.se@gmail.com>
*/
define([
	'./LoadingState',
	'./IntroState',
	'./MenuState',
	'./QuestionState'
], function(LoadingState, IntroState, MenuState, QuestionState) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function StateFacade() {}

	/**
	 * Create and return a new state.
	 *
	 * @param string stateClass
	 * @return State | undefined
	 */
	StateFacade.prototype.createState = function(stateClass) {
		switch (stateClass) {
			case "LoadingState":
				return new LoadingState();
			case "IntroState":
				return new IntroState();
			case "MenuState":
				return new MenuState();
			case "QuestionState":
				return new QuestionState();
		}
	};

	return new StateFacade();
});
