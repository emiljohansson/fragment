/**
 * The startingpoing.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['game/mygame'], function(MyGame) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function Applicaiton() {
		this.game = new MyGame();
	}

	return new Applicaiton();
});
