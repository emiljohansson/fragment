/**
 * ...
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 * License: MIT
 */
(function(window, document, undefined) {

'use strict';

var fragment = {};

/**
 * Returns true if the passed object is not null nor undefined.
 *
 * @param mixed obj
 * @return boolean
 */
function isSet(obj) {
    return (typeof obj !== 'undefined' && obj !== null);
}
fragment.isSet = isSet;

/**
 * Returns if the type of the object is a string.
 *
 * @param mixed obj
 * @return boolean
 */
function isString(obj) {
	return typeof obj === 'string';
}
fragment.isString = isString;

/**
 *	https://github.com/emiljohansson/captn
 *
 *	Object for handling dom events.
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.1
 *	@since		2013-08-10
 */

//-----------------------------------------------------------
//	Public class
//-----------------------------------------------------------

var Event = {};

//-----------------------------------------------------------
//	Public static constant properties
//-----------------------------------------------------------

Event.EventType = {};
Event.EventType.LOAD = 'load';
Event.EventType.SUBMIT = 'submit';
Event.EventType.CLICK = 'click';
Event.EventType.CHANGE = 'change';

//-----------------------------------------------------------
//	Private methods
//-----------------------------------------------------------

/**
 *	Appends an event to each element in the array.
 *
 *	@param	{array}		elemList
 *	@param	{string}	type
 *	@param	{Function}	listener
 *	@param	{string}	useCapture
 *	@return	{undefined}
 */
function addListenerToArray(elemList, type, listener, useCapture) {
	var i = elemList.length;
	while (i--) {
		Event.addListener(elemList[i], type, listener, useCapture);
	}
}

//-----------------------------------------------------------
//	Public methods
//-----------------------------------------------------------

/**
 *	Appends an event to an element.
 *
 *	@param	{HTMLElement | array}	elem
 *	@param	{string}				type
 *	@param	{Function}				listener
 *	@param	{string}				useCapture
 *	@return	{HTMLElement}
 */
Event.addEventListener = function(elem, type, listener, useCapture) {
	useCapture = useCapture || false;
	if (Object.prototype.toString.call( elem ) === '[object Array]') {
		addListenerToArray(elem, type, listener, useCapture);
		return;
	}
	if (!elem) {
		return;
	}
	if (elem.addEventListener) {
		elem.addEventListener(type, listener, useCapture);
	}
	else if (elem.attachEvent) {
		elem.attachEvent('on'+type, listener);
	}
	return elem;
};

/**
 *	Removes an event from an element.
 *
 *	@param	{HTMLElement | array}	elem
 *	@param	{string}				type
 *	@param	{Function}				listener
 *	@param	{string}				useCapture
 *	@return	{HTMLElement}
 */
Event.removeEventListener = function(elem, type, listener, useCapture) {
	useCapture = useCapture || false;
	if (!elem || !listener) {
		return;
	}
	if (elem.removeEventListener) {
		elem.removeEventListener(type, listener, useCapture);
	}
	else if (elem.detachEvent) {
		elem.detachEvent('on'+type, listener);
	}
	return elem;
};

/**
 *	Using an element to trigger an event.
 *
 *	@param	{HTMLElement | array}	elem
 *	@param	{string}				type
 *	@param	{Function}				listener
 *	@param	{string}				useCapture
 *	@return	{HTMLElement}
 */
Event.triggerEvent = function(elem, type) {
	if (!elem) {
		return;
	}
	var event;
	if (document.createEvent) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(type, true, true);
	}
	else {
		event = document.createEventObject();
		event.eventType = type;
	}
	if (document.createEvent) {
		elem.dispatchEvent(event);
	}
	else {
		elem.fireEvent("on" + event.eventType, event);
	}
	return elem;
};

/**
 *	Returns the current target of the event.
 *
 *	@param	{BrowserEvent}	event
 *	@return {boolean}
 */
Event.currentTarget = function(event) {
	return !!event.currentTarget ? event.currentTarget : event.srcElement;
};

fragment.Event = Event;

/**
 * Constructor method.
 * Visualizes an EventDispatcher.
 */
function EventDispatcher() {
	this._listeners = {};
	this._captureListeners = {};
}

/**
 * Register an event. It's possible to add multiple events of the same type,
 * resulting in multiple listeners.
 *
 * @param string type
 * @param function listener
 * @param boolean useCapture
 * @return EventDispatcher
 */
EventDispatcher.prototype.addEventListener = function(type, listener, useCapture) {
	useCapture = useCapture || false;
	if (typeof this._listeners[type] === 'undefined') {
		this._listeners[type] = [];
	}
	this._listeners[type].push({
		listener: listener,
		context: this
	});
	return this;
};

/**
 * Removes all events for the type.
 *
 * @param string type
 * @param function listener
 * @param boolean useCapture
 * @return EventDispatcher
 */
EventDispatcher.prototype.removeEventListener = function(type, listener, useCapture) {
	useCapture = useCapture || false;
	if (typeof this._listeners[event] === 'undefined') {
		return this;
	}
	var listeners = this._listeners[event];
	if (typeof listeners === 'undefined') {
		return this;
	}
	var i = listeners.length;
	while (i--) {
		if (listeners[i].listener === listener) {
			listeners.splice(i, 1);
		}
	}
	return this;
};

/**
 * Triggers an event.
 *
 * @param string type
 * @param Array | object args
 * @return EventDispatcher
 */
EventDispatcher.prototype.dispatchListener = function(type, args) {
	if (typeof this._listeners[event] === 'undefined') {
		return this;
	}
	var listeners = this._listeners[event];
	if (typeof listeners === 'undefined') {
		return this;
	}
	var i = listeners.length;
	while (i--) {
		listeners[i].listener.call(listeners[i].context, args);
	}
	return this;
};

fragment.EventDispatcher = EventDispatcher;

/**
 * Constructor method.
 *
 * @param string nodeName
 */
function Element(nodeName) {
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
Element.prototype.dispose = function() {};

/**
 * @ineheritDoc
 */
Element.prototype.addEventListener = function(type, listener, useCapture) {
	if (this._inEventList(type) === false) {
		return EventDispatcher.prototype.addEventListener.call(type, listener, useCapture);
	}
	Event.addEventListener(this._element, type, listener, useCapture);
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
* @param string selector
* @return DOMElement || null
*/
Element.prototype.find = function(selector) {
	return this.getElement().querySelector(selector);
};

/**
* ...
*
* @param boolean visible
* @return undefined
*/
Element.prototype.setVisible = function(visible) {
	if (visible === true) {
		this.css('left', '');
		this.css('position', '');
		return;
	}
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
		if (isSet(this._element) === false) {
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
	if (isSet(this.parent) === false) {
		return;
	}
	this.parent.remove(this._element);
	if (typeof this.dispose === 'function') {
		this.dispose();
	}
};

/**
* Factory methods.
*/
Element.create = function(nodeName) {
	return new Element(nodeName);
};

Element.createWithElement = function(elem) {
	var element = new Element();
	element.setElement(elem);
	return element;
};

fragment.Element = Element;

/**
* Constructor method.
* A container of elements.
*/
function Container() {
	Element.apply(this);
	this._element.setAttribute('class', 'fragment-container');
}
Container.prototype = Object.create(Element.prototype);

fragment.Container = Container;

/**
* Constructor method.
* Visualizes a button.
*/
function Button(label) {
	Element.apply(this);
	this._element.setAttribute('class', 'fragment-Button');
	this.html(label);
}
Button.prototype = Object.create(Element.prototype);

/**
 * The element type, example div or input.
 * @var string
 */
Button.prototype._type = 'button';

/**
 * Returns the DOM element.
 *
 * @return DOMElement
 */
Button.prototype.onClick = function() {
	return this._element;
};

/**
 * Factory methods.
 */
Button.create = function(label) {
	return new Button(label);
};

Button.createWithElement = function(elem) {
	var btn = new Button();
	btn.setElement(elem);
	return btn;
};

fragment.Button = Button;

/**
 * Constructor method.
 * The lowerst appendable element in the application.
 * Appends to the body tag.
 *
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
};

fragment.root = new Root();

/**
* Constructor method.
*/
function DisplayState() {
	Element.apply(this);
	this._element.setAttribute('class', 'fragment-displayState');
}
DisplayState.prototype = Object.create(Element.prototype);

/**
* Initializes the state.
*
* @return undefined
*/
DisplayState.prototype.init = function() {};

/**
* Initializes the state.
*
* @return undefined
*/
DisplayState.prototype.dispose = function() {
	Element.prototype.dispose.call(this);
};

fragment.DisplayState = DisplayState;

/**
 * ...
 * @var LoadQueue
 */
var preload = null;

/**
* Constructor method.
*/
function AssetManager() {
	/**
	* Successful downloads.
	* @var int
	*/
	this._successCount = 0;

	/**
	* Number of failed downloads.
	* @var int
	*/
	this._errorCount = 0;

	/**
	* The onComplete method will only be called once, for now.
	* @var int
	* @todo better solution for on demand calls. new class?
	*/
	this._manifestLoaded = false;

	/**
	* Will be triggered for each file loaded.
	* @var function
	*/
	this.onItemLoaded = function() {};

	/**
	* Will be triggered for each file that fails to load.
	* @var function
	*/
	this.onItemFailed = function() {};

	/**
	* Will be triggered once all files are downloaded.
	* @var function
	*/
	this.onComplete = function() {};

	this._initPreloader();
}

/**
* Initializes createjs preloader.
*
* @return undefined
*/
AssetManager.prototype._initPreloader = function() {
	if (preload !== null) {return;}
	createjs.FlashPlugin.swfPath = "./flash/";
	createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	preload = preload || new createjs.LoadQueue(true);
	preload.installPlugin(createjs.Sound);
	preload.on("fileload", this._handleFileLoaded.bind(this));
	preload.on("error", this._handleFileError.bind(this));
};

/**
* Loads a single file and calls back when done.
* For now this should only be used after initial loading. It will break
* the default file handle method.
*
* @param object fileData require following properties:
*	src
*	data
*   type
* 	id
* @return undefined
*/
AssetManager.prototype.loadFileOnDemand = function(fileData) {
	preload.loadFile(fileData);
};

/**
* Loads an entire manifest file.
*
* @param string manifestFile
* @return undefined
*/
AssetManager.prototype.loadManifest = function(manifestFile, folder) {
	preload.loadFile({src:manifestFile, callback:"maps", type:"manifest"}, true, folder);
};

/**
* Initializes the loaded file.
*
* @param Event event
* @return undefined
*/
AssetManager.prototype._handleFileLoaded = function(event) {
	var item = event.item;
	this.onItemLoaded(item);
	this._successCount++;
	if (this._isDone() && this._manifestLoaded === false) {
		this._manifestLoaded = true;
		this.onComplete();
	}
};

/**
* Handles the failed file.
*
* @param Event event
* @return undefined
*/
AssetManager.prototype._handleFileError = function(event) {
	var item = event.item;
	this.onItemFailed(item);
	this._errorCount++;
	if (this._isDone()) {
		this.onComplete();
	}
};

/**
* ...
*
* @return boolean
*/
AssetManager.prototype._isDone = function() {
	if (this.onUpdate !== null && typeof this.onUpdate === 'function') {
		this.onUpdate(preload.progress);
	}
	return preload.progress >= 1;
};

/**
* ...
*
* @param string id The id from the manifest.
* @return object
*/
AssetManager.prototype.getAsset = function(assetId) {
	var asset = preload.getItem(assetId);
	if (typeof asset === 'undefined') {
		throw 'Asset not found';
	}
	return asset;
};

fragment.assetManager = new AssetManager();

/**
 * Constructor method.
 *
 * @param Number seconds
 */
function Countdown(seconds) {
	/**
	 * ...
	 * @var Object
	 */
	this._intervalId = null;

	/**
	 * How countdown time.
	 * @var Number
	 */
	this._seconds = seconds;
}

/**
* ...
*
* @return undefined
*/
Countdown.prototype.dispose = function() {
	clearInterval(this._intervalId);
	this._intervalId = null;
	this._seconds = null;
	this.onComplete = null;
	this.onTick = null;
};

/**
 * Is called every second.
 *
 * @return undefined
 */
Countdown.prototype._tick = function() {
	this._seconds = this._seconds - 1;
	if (this._seconds < 0) {
		this.stop();
		return;
	}
	if (fragment.isSet(this.onTick) === true) {
		this.onTick(this.getCount());
	}
};

/**
 * Called once the counter reaches zero.
 *
 * @return undefined
 */
Countdown.prototype._complete = function() {
	if (fragment.isSet(this.onComplete) === true) {
		this.onComplete();
	}
};

/**
 * Is called every second.
 * @var Function
 */
Countdown.prototype.onTick = null;

/**
 * Is called when the counter reaches zero.
 * @var Function
 */
Countdown.prototype.onComplete = null;

/**
 * Starts the countdown.
 *
 * @return undefined
 */
Countdown.prototype.start = function() {
	this._intervalId = setInterval(this._tick.bind(this), 1000);
    this._tick();
};

/**
 * Interrupts the countdown and calls the complete method.
 *
 * @return undefined
 */
Countdown.prototype.stop = function() {
	clearInterval(this._intervalId);
	this._complete();
};

/**
 * Returns the current value of the countdown.
 *
 * @return Number
 */
Countdown.prototype.getCount = function() {
	return this._seconds;
};

fragment.Countdown = Countdown;

/**
 * Constructor method.
 */
function SoundManager() {}

/**
* Plays a sound.
*
* @param AssetManager assetManager
* @return sound instance
*/
SoundManager.prototype.play = function(src, interrupt, delay, offset, loop, volume, pan, startTime, duration) {
	if (this.soundIsOn() === false) { //sort of IE9 fix...
		return;
	}
	return createjs.Sound.play(src, interrupt, delay, offset, loop, volume, pan, startTime, duration);
};

/**
* ...
*
* @param AssetManager assetManager
* @return sound instance
*/
SoundManager.prototype.playInstance = function(soundInstance) {
	if (this.soundIsOn() === false) { //sort of IE9 fix...
		return;
	}
	return soundInstance.play();
};

/**
 * Appends the SoundManager onto the element.
 *
 * @return boolean
 */
SoundManager.prototype.toggleSound = function() {
	createjs.Sound.setMute(!createjs.Sound.getMute());
	return this.soundIsOn();
};

/**
* ...
*
* @return boolean
*/
SoundManager.prototype.soundIsOn = function() {
	return !createjs.Sound.getMute();
};

fragment.soundManager = new SoundManager();

/**
 * Base of all plugins.
 */
function Plugin() {
	this._list = [];
	this._element = null;
}

/**
 * Adds an element to the list.
 *
 * @param Element element
 * @return undefined
 */
Plugin.prototype.add = function(element) {
	this._list.push(element);
	this._initElement(element);
};

/**
 * Appends the plugin onto the element.
 *
 * @param Element element
 * @return undefined
 */
Plugin.prototype._initElement = function(element) {
	this._element = element;
};

fragment.Plugin = Plugin;

function Animation() {
	Plugin.apply(this);
}
Animation.prototype = Object.create(Plugin.prototype);

/**
 * Appends the plugin onto the element.
 *
 * @param Element element
 * @return undefined
 */
Animation.prototype._initElement = function(element) {
	Plugin.prototype._initElement.call(this, element);
    element.animation = {
        expand: function(width, height) {
            $(element.getElement()).animate({
                width: width,
                height: height
            }, 1000, "linear");
        },
		marginLeft: function(val) {
			$(element.getElement()).animate({
				marginLeft: val
			}, 1000, "linear");
		},
        stop: function() {
            $(element.getElement()).stop();
        }
    };
};

/**
 * Appends an animation to the element object.
 *
 * @param object properties
 * @return undefined
 */
Animation.prototype.append = function(/*properties*/) {
	//
};

/**
* Return the percentage of the bar.
*
* @return Number
*/
Animation.prototype.percent = function() {
	var w = this._element.getElement().style.width;
	return w.substring(0, w.length-1);
};

fragment.animation = new Animation();

window.fragment = fragment;
})(window, document);
