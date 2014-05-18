/**
 * A container of elements.
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['./element'], function(Element) {
	'use strict';

	/**
	* Constructor method.
	*/
	function Container() {
		Element.apply(this);
		this._element.setAttribute('class', 'fragment-container');
	}
	Container.prototype = Object.create(Element.prototype);

	return Container;
});
