/**
* Constructor method.
* Anchor widget.
*/
function Anchor(href, label) {
    Element.apply(this);
    this._element.setAttribute('class', 'fragment-Anchor');
    this.href(href);
    this.html(label);
}
Anchor.prototype = Object.create(Element.prototype);

/**
 * The element type, example div or input.
 * @var string
 */
Anchor.prototype._type = 'a';

/**
 * Returns the DOM element.
 *
 * @return DOMElement
 */
Anchor.prototype.href = function(optStr) {
    if (fragment.isSet(optStr)) {
        this._element.setAttribute('href', optStr);
        return;
    }
    return this._element.getAttribute('href');
};

fragment.Anchor = Anchor;
