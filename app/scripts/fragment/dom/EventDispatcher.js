/**
 * Visualizes a EventDispatcher.
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([], function() {
	'use strict';

	/**
	* Constructor method.
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

	return EventDispatcher;
});