/**
 * The lowerst appendable element in the application.
 * Is appended to the body tag.
 */
function Root() {
    Element.apply(this);
    this._initElement();
}
Root.prototype = Object.create(Element.prototype);

/**
 * Either appends a new div element to the body
 * or uses the existing one.
 *
 * @return undefined
 * @private
 */
Root.prototype._initElement = function() {
    if (document.getElementById('root') === null) {
        document.body.appendChild(this._element);
        this._element.setAttribute('id', 'root');
        return;
    }
    this._element = document.getElementById('root');
};

fragment.root = new Root();
