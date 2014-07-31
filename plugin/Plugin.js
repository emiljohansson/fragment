/**
 * Base of all plugins.
 */
function Plugin() {
	this._list = [];
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
Plugin.prototype._initElement = function(element) {};

fragment.Plugin = Plugin;
