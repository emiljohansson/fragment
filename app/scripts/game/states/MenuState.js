/**
 * ...
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([
	'fragment/state/DisplayState',
	'./QuestionState',
	'fragment/dom/Element',
	'fragment/dom/Container',
	'fragment/dom/Button'
], function(DisplayState, QuestionState, Element, Container, Button) {
	'use strict';

	/**
	 * List of buttons
	 * @var Array
	 */
	var buttonList = null;

	/**
	 * Constructor method.
	 */
	function MenuState() {
		DisplayState.apply(this);
	}
	MenuState.prototype = Object.create(DisplayState.prototype);

	/**
	 * Initializes the state.
	 *
	 * @return undefined
	 */
	MenuState.prototype.init = function() {
		this._container = new Container();
		this._container.appendTo(this);
		var label = new Element();
		label.html('Menu');
		label.appendTo(this._container);
		this._initButtonList();
	};

	/**
	 * Initializes the state.
	 *
	 * @return undefined
	 */
	MenuState.prototype._initButtonList = function() {
		var i;
		if (buttonList !== null) {
			for (i = 0; i < buttonList.length; i++) {
				buttonList[i].appendTo(this._container);
			}
			return;
		}
		var self = this;
		buttonList = [];
		i = 1;
		var fn = function() {
			console.log('click');
			this.removeEventListener('click', fn);
			self.myGame.setState(new QuestionState(this.innerHTML))
		};
		while (i<=50) {
			var btn = new Button(i);
			btn.addEventListener('click', fn);
			buttonList.push(btn);
			i++;
		}
		this._initButtonList();
	};

	return MenuState;
});
