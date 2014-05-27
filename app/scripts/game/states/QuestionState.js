/**
 * ...
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([
	'fragment/state/DisplayState',
	'fragment/dom/Element',
	'fragment/dom/Container',
	'fragment/dom/Button',
	'fragment/util/Countdown',
    'fragment/plugin/Animation'
], function(DisplayState, Element, Container, Button, Countdown, Animation) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function QuestionState(buttonValue) {
		console.log('question', buttonValue);
		DisplayState.apply(this);

		/**
		 * A countdown.
		 * @var Countdown
		 */
		this._countdown = null;

		/**
		 * The game is on.
		 * @var boolean
		 */
		this._gameIsActive = true;
	}
	QuestionState.prototype = Object.create(DisplayState.prototype);

	/**
	 * Initializes the state.
	 *
	 * @return undefined
	 */
	QuestionState.prototype.init = function() {
		this._container = new Container();
		this._container.appendTo(this);
		var label = new Element();
		label.html('Current question');
		label.appendTo(this._container);

		this._initButtons();
		this._initCountdown();
	};

	/**
	 * ...
	 *
	 * @return undefined
	 */
	QuestionState.prototype._initButtons = function() {
		var self = this;
		var answers = ['Aaa', 'Bbb', 'Ccc'];
		var btnList = [];
		var fn = function(event) {
			rm();
			self._answerSelected(this.innerHTML);
		};
		var rm = function() {
			for (var i = 0; i < btnList.length; i++) {
				btnList[i].getElement().removeEventListener('click', fn);
			}
		};
		while (answers.length) {
			var btn = new Button(answers.shift());
			btn.addEventListener('click', fn);
			btn.appendTo(this._container);
			btnList.push(btn);
		}
	};

	/**
	 * ...
	 *
	 * @param string answer
	 * @return undefined
	 */
	QuestionState.prototype._answerSelected = function(answer) {
		if (this._gameIsActive === false) {
			return;
		}
		console.log('click answer', answer);
		this._countdown.stop();
		this._fill.animation.stop();
	};

	/**
	 * ...
	 *
	 * @return undefined
	 */
	QuestionState.prototype._initCountdown = function() {
		var self = this;
		var meter = new Element();
		meter.addStyleName('fragment-progress');
		meter.appendTo(this._container);
		this._fill = new Element();
        Animation.add(this._fill);
		this._fill.addStyleName('fragment-progress-bar');
		this._fill.appendTo(meter);
		this._fill.css("width", "100%");
		var initCount = 2;
		var percent = 100;
		this._countdown = new Countdown(initCount);
		this._countdown.onTick = function(count) {
			percent = count <= 0 ? 0 : (count / initCount) * 100;
			self._fill.animation.expand(percent+"%");
		};
		this._countdown.onComplete = this._onTimerEnds.bind(this);
		this._countdown.start();
	};

	/**
	 * ...
	 *
	 * @return undefined
	 */
	QuestionState.prototype._onTimerEnds = function() {
		this._gameOver();
	};

	/**
	 * ...
	 *
	 * @return undefined
	 */
	QuestionState.prototype._gameOver = function() {
		this._gameIsActive = false;
        console.log("game over");
	};

	return QuestionState;
});
