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
