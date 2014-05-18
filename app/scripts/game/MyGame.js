/**
 * The base of the game.
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([
    'fragment/dom/Root',
    './states/LoadingState',
    './states/IntroState'
], function(root, LoadingState, IntroState) {
    'use strict';

    /**
     * Constructor method.
     */
    function MyGame() {
        this._state = null;
        this.setState(LoadingState);
        this.setState(IntroState);
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
        this._state = new stateClass();
        this._state.init();
        this._state.appendTo(root);
    };

    return MyGame;
});
