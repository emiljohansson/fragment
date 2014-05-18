/**
 * The lowerst appendable element in the application.
 * Appends to the body tag.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['./element'], function(Element) {
    'use strict';

    /**
    * Constructor method.
    */
    function Root() {
        Element.apply(this);
        this._initElement();
    }
    Root.prototype = Object.create(Element.prototype);

    /**
     * Either appends a new div element to the body
     * or uses the existing one.
     *
     * @return undefined
     */
    Root.prototype._initElement = function() {
        if (document.getElementById('root') === null) {
            document.body.appendChild(this._element);
            this._element.setAttribute('id', 'root');
            return;
        }
        this._element = document.getElementById('root');
    }

    return new Root();
});
