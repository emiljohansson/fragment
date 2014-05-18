/**
 * The base of the game.
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['../fragment'], function(fragment) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function Element() {
		this.parent = null;
		this._element = document.createElement('div');
	}

    /**
     * Returns the DOM element.
     *
     * @return DOMElement
     */
    Element.prototype.getElement = function() {
        return this._element;
    };

    /**
     * Adds a string to the element.
     *
     * @param string htmlOrString
     * @return undefined
     */
    Element.prototype.html = function(htmlOrString) {
        if (fragment.isString(htmlOrString) === true) {
            this._element.innerHTML = htmlOrString;
            return;
        }
        //this._element.appendChild(child);
    };

	/**
	 * Appends a child.
	 *
	 * @param Element child
	 * @return undefined
	 */
	Element.prototype.add = function(child) {
		this._element.appendChild(child);
	};

	/**
	 * Removes a child.
	 *
	 * @param Element child
	 * @return undefined
	 */
	Element.prototype.remove = function(child) {
		this._element.removeChild(child);
	};

	/**
	 * Appends the element to the passed element.
	 *
	 * @param Element element
	 * @return undefined
	 */
	Element.prototype.appendTo = function(element) {
		this.removeFromParent();
		this.parent = element;
		this.parent.add(this._element);
	};

	/**
	 * Removes the element from the stage.
	 *
	 * @return undefined
	 */
	Element.prototype.removeFromParent = function() {
		if (this.parent === null) {
			return;
		}
		this.parent.remove(this._element);
	};

	return Element;
});
