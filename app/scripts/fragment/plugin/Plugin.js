/**
 * Base of all plugins.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([], function() {
	'use strict';

	/**
	 * Constructor method.
	 */
	function Plugin() {
    this.list = [];
  }

  /**
   * Adds an element to the list.
   *
   * @param Element element
   * @return undefined
   */
  Plugin.prototype.add = function(element) {
    this.list.push(element);
    this.initElement(element);
  };

  /**
   * Appends the plugin onto the element.
   *
   * @param Element element
   * @return undefined
   */
  Plugin.prototype.initElement = function(element) {};

	return Plugin;
});
