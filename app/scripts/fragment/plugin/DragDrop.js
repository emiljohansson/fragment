/**
 * Appends drag and drop abilities to an element.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['./Plugin'], function(Plugin) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function DragDrop() {
    Plugin.apply(this);
	}
	DragDrop.prototype = Object.create(Plugin.prototype);

  /**
   * Appends the plugin onto the element.
   *
   * @param Element element
   * @return undefined
   */
  DragDrop.prototype.initElement = function(element) {
    Plugin.prototype.initElement.call(this, element);
    //$(element.getElement()).draggable();
  };

	return new DragDrop();
});
