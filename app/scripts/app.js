/**
 * The startingpoing.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([
	'game/MyGame'
], function(MyGame) {
	'use strict';

    /**
     * Constructor method.
     */
    function Applicaiton() {
        this.game = null;
    }

    Applicaiton.prototype.ready = function() {
        this.game = new MyGame();
    };

    return new Applicaiton();
});
