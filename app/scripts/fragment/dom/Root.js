/**
 * The lowerst appendable element in the application.
 * Appends to the body tag.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define(['./element'], function(Element) {
	'use strict';

	/**
	 * Constructor method.
	 */
	function Root() {
		Element.apply(this);
		document.body.appendChild(this.element);
		this.element.setAttribute('class', 'hero-unit');
	}
	Root.prototype = Object.create(Element.prototype);

	return new Root;
});
