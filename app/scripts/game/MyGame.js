/**
 * The base of the game.
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([
    'fragment/dom/Root',
    './states/StateFacade'
], function(root, stateFacade) {
    'use strict';

    /**
     * Constructor method.
     */
    function MyGame() {
        this._state = null;
        this.setState(stateFacade.createState('QuestionState'));
    }

    /**
     * Removes current state and adds the new one.
     *
     * @param State stateClass
     * @return undefined
     * @todo create State class
     */
    MyGame.prototype.setState = function(stateClass) {
        if (this._state !== null) {
            this._state.dispose();
        }
        this._state = stateClass;
        this._state.myGame = this; //temp
        this._state.init();
        this._state.appendTo(root);
    };

    return MyGame;
});
