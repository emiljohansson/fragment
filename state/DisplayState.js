/**
* Constructor method.
*/
function DisplayState() {
	Element.apply(this);
	this._element.setAttribute('class', 'fragment-displayState');
}
DisplayState.prototype = Object.create(Element.prototype);

/**
* Initializes the state.
*
* @return undefined
*/
DisplayState.prototype.init = function() {};

/**
* Initializes the state.
*
* @return undefined
*/
DisplayState.prototype.dispose = function() {
	Element.prototype.dispose.call(this);
};

fragment.DisplayState = DisplayState;
