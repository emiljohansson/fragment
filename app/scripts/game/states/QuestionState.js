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
    'fragment/util/Countdown'
], function(DisplayState, Element, Container, Button, Countdown) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function QuestionState(buttonValue) {
		console.log('question', buttonValue);
		DisplayState.apply(this);
		this._container = new Container();
		this._container.appendTo(this);
		var label = new Element();
		label.html('Current question');
		label.appendTo(this._container);

		var answers = ['Aaa', 'Bbb', 'Ccc'];
		var fn = function() {
			console.log('click answer');
			this.removeEventListener('click', fn);
		};
		while (answers.length) {
			var btn = new Button(answers.shift());
			btn.addEventListener('click', fn);
			btn.appendTo(this._container);
		}

        var meter = new Element();
        meter.addStyleName('fragment-progress');
        meter.appendTo(this._container);
        var fill = new Element();
        fill.addStyleName('fragment-progress-bar');
        fill.appendTo(meter);
        fill.css("width", "100%");
        var initCount = 5;
        var percent = 100;
        var countdown = new Countdown(initCount);
        countdown.onTick = function(count) {
            console.log(count / initCount);
            console.log(count, initCount);
            percent = count <= 0 ? 0 : count / initCount;
            percent *= 100;
            fill.css("width", percent+"%");
        };
        countdown.onComplete = function() {
            console.log("done");
        };
        countdown.start();
	}
	QuestionState.prototype = Object.create(DisplayState.prototype);

	/**
	 * Initializes the state.
	 *
	 * @return undefined
	 */
	QuestionState.prototype.init = function() {
		//
	};

	return QuestionState;
});
