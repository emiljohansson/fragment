/**
 * The base of the game.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([], function() {
	'use strict';

	/**
	 * Constructor method.
	 */
	function Element() {
		this.parent = null;
		this.element = document.createElement('div');
	}

  /**
   * Returns the DOM element.
   *
   * @return DOMElement
   */
  Element.prototype.getElement = function() {
    return this.element;
  };

	/**
	 * Appends a child.
	 *
	 * @param Element child
	 * @return undefined
	 */
	Element.prototype.add = function(child) {
		this.element.appendChild(child);
	};

	/**
	 * Removes a child.
	 *
	 * @param Element child
	 * @return undefined
	 */
	Element.prototype.remove = function(child) {
		this.element.removeChild(child);
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
		this.parent.add(this.element);
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
		this.parent.remove(this.element);
	};

	return Element;
});
