/**
 * The base of the game.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['fragment/dom/Root', 'fragment/dom/Element', 'fragment/plugin/DragDrop'], function(root, Element, dragDrop) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function MyGame() {
		var el = new Element();
		el.element.innerHTML = 'HEJ';
		el.appendTo(root);
		dragDrop.add(el);
	}
	return MyGame;
});
