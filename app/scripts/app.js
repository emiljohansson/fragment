/**
 * The startingpoing.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([
	'angular',
	'game/MyGame',
	'angularRoute'
], function(angular, MyGame) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function Applicaiton() {
		this.module = angular.module('myGame', ['ngRoute']);
		this.game = null;
	}

	Applicaiton.prototype.ready = function() {
		this.game = new MyGame();
	};

	return new Applicaiton();
});
