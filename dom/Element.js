/**
 * Constructor method.
 *
 * @param string nodeName
 */
function Element(nodeName) {
	EventDispatcher.call(this);

	/**
	 * Element object.
	 * @var Element
	 */
	this.parent = null;

	/**
	 * Dom element.
	 * @var DOMElement
	 */
	this._element = document.createElement(nodeName || this._type);
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
 * Returns true if a specific event type is in the list of mouse events.
 *
 * @param string type
 * @return boolean
 * @private
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
* ...
*
* @return undefined
*/
Element.prototype.dispose = function() {
	EventDispatcher.prototype.dispose.call(this);
};

/**
 * @ineheritDoc
 */
Element.prototype.addEventListener = function(type, listener, useCapture) {
	if (this._inEventList(type) === true) {
		Event.addEventListener(this._element, type, listener, useCapture);
	}
	return EventDispatcher.prototype.addEventListener.call(this, type, listener, useCapture);
};

/**
 * @ineheritDoc
 */
Element.prototype.removeEventListener = function(type, listener, useCapture) {
	if (this._inEventList(type) === true) {
		Event.removeEventListener(this._element, type, listener);
	}
	return EventDispatcher.prototype.removeEventListener.call(this, type, listener, useCapture);
};

/**
* Triggers an event.
*
* @param string type
* @param Array | object args
* @return EventDispatcher
*/
Element.prototype.dispatchListener = function(type, args) {
	if (this._inEventList(type) === true) {
		Event.triggerEvent(this._element, type);
		return this;
	}
	return EventDispatcher.prototype.dispatchListener.call(this, type, args);
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
 * Replaces the current DOM element.
 *
 * @param DOMElement elem
 * @return DOMElement
 */
Element.prototype.setElement = function(elem) {
	this._element = elem;
	return this._element;
};

/**
 * ...
 *
 * @param boolean visible
 * @return undefined
 */
Element.prototype.setVisible = function(visible) {
	if (visible === true) {
		this.css('top', '');
		this.css('left', '');
		this.css('position', '');
		return;
	}
	this.css('top', '-9999px');
	this.css('left', '-9999px');
	this.css('position', 'absolute');
};

/**
 * Adds a string to the element.
 *
 * @param string htmlOrString
 * @return undefined
 */
Element.prototype.html = function(htmlOrString) {
	if (fragment.isString(htmlOrString) === true || typeof htmlOrString === 'number') {
		if (fragment.isSet(this._element) === false) {
			return;
		}
		this._element.innerHTML = htmlOrString;
	}
	return this._element.innerHTML;
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
    this._element.className += " "+className;
};

/**
* Adds a class name to the element.
*
* @param string className
* @return undefined
*/
Element.prototype.removeStyleName = function(className) {
	this._element.className = this._element.className.replace(className, "");
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
	if (typeof this.init === 'function') {
		this.init();
	}
};

/**
 * Removes the element from the stage.
 *
 * @return undefined
 */
Element.prototype.removeFromParent = function() {
	if (fragment.isSet(this.parent) === false) {
		return;
	}
	this.parent.remove(this._element);
	if (typeof this.dispose === 'function') {
		this.dispose();
	}
};

/**
 * ...
 *
 * @param string selector
 * @return DOMElement || null
 */
Element.prototype.find = function(selector) {
	return this.getElement().querySelector(selector);
};

/**
* Factory methods.
*/
Element.create = function(nodeName) {
	return new Element(nodeName);
};

Element.createWithElement = function(elem) {
	if (fragment.isSet(elem) === false) {
		throw 'elem is not set';
	}
	var element = new Element();
	element.setElement(elem);
	return element;
};

fragment.Element = Element;
