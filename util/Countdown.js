/**
 * Constructor method.
 *
 * @param Number seconds
 */
function Countdown(seconds) {
	/**
	 * ...
	 * @var Object
	 */
	this._intervalId = null;

	/**
	 * How countdown time.
	 * @var Number
	 */
	this._seconds = seconds;
}

/**
* ...
*
* @return undefined
*/
Countdown.prototype.dispose = function() {
	clearInterval(this._intervalId);
	this._intervalId = null;
	this._seconds = null;
	this.onComplete = null;
	this.onTick = null;
};

/**
 * Is called every second.
 *
 * @return undefined
 */
Countdown.prototype._tick = function() {
	this._seconds = this._seconds - 1;
	if (this._seconds < 0) {
		this.stop();
		return;
	}
	if (fragment.isSet(this.onTick) === true) {
		this.onTick(this.getCount());
	}
};

/**
 * Called once the counter reaches zero.
 *
 * @return undefined
 */
Countdown.prototype._complete = function() {
	if (fragment.isSet(this.onComplete) === true) {
		this.onComplete();
	}
};

/**
 * Is called every second.
 * @var Function
 */
Countdown.prototype.onTick = null;

/**
 * Is called when the counter reaches zero.
 * @var Function
 */
Countdown.prototype.onComplete = null;

/**
 * Starts the countdown.
 *
 * @return undefined
 */
Countdown.prototype.start = function() {
	this._intervalId = setInterval(this._tick.bind(this), 1000);
    this._tick();
};

/**
 * Interrupts the countdown and calls the complete method.
 *
 * @return undefined
 */
Countdown.prototype.stop = function() {
	clearInterval(this._intervalId);
	this._complete();
};

/**
 * Returns the current value of the countdown.
 *
 * @return Number
 */
Countdown.prototype.getCount = function() {
	return this._seconds;
};

fragment.Countdown = Countdown;
