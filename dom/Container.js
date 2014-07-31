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
