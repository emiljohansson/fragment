/**
 * The base of the game.
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['./EventDispatcher', '../event/Event', '../fragment'], function(EventDispatcher, Event, fragment) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function Element() {
		EventDispatcher.apply(this);

		/**
		 * Element object.
		 * @var Element
		 */
		this.parent = null;

		/**
		 * Dom element.
		 * @var DOMElement
		 */
		this._element = document.createElement(this._type);
	}
	Element.prototype = Object.create(EventDispatcher.prototype);

	/**
	 * The element type, example div or input.
	 * @var string
	 */
	Element.prototype._type = 'div';

	/**
	 * The element type, example div or input.
	 * @var string
	 */
	Element.prototype._mouseEvents = ['click'];

	/**
	 * @ineheritDoc
	 */
	Element.prototype._inEventList = function(type) {
		var i = this._mouseEvents.length;
		while (i--) {
			if (type === this._mouseEvents[i]) {
				return true;
			}
		}
		return false;
	};

	/**
	* Initializes the state.
	*
	* @return undefined
	*/
	Element.prototype.dispose = function() {
		this.removeFromParent();
	};

	/**
	 * @ineheritDoc
	 */
	Element.prototype.addEventListener = function(type, listener, useCapture) {
		if (this._inEventList(type) === false) {
			return EventDispatcher.prototype.addEventListener.call(type, listener, useCapture);
		}
		Event.addEventListener(this._element, type, listener);
		return this;
	};

	/**
	 * @ineheritDoc
	 */
	EventDispatcher.prototype.removeEventListener = function(type, listener, useCapture) {
		if (this._inEventList(type) === false) {
			return EventDispatcher.prototype.addEventListener.call(type, listener, useCapture);
		}
		Event.removeEventListener(this._element, type, listener);
		return this;
	};

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
		if (fragment.isString(htmlOrString) === true || typeof htmlOrString === 'number') {
			this._element.innerHTML = htmlOrString;
			return;
		}
		//this._element.appendChild(child);
	};

    /**
     * Adds a inline style to the element.
     *
     * @param string propertyName
     * @param string value
     * @return undefined
     */
    Element.prototype.css = function(propertyName, value) {
        this._element.style[propertyName] = value;
    };

    /**
     * Adds a class name to the element.
     *
     * @param string className
     * @return undefined
     */
    Element.prototype.addStyleName = function(className) {
        this._element.className += className;
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
