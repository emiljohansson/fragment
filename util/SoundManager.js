/**
 * Constructor method.
 */
function SoundManager() {}

/**
* Plays a sound.
*
* @param AssetManager assetManager
* @return sound instance
*/
SoundManager.prototype.play = function(src, interrupt, delay, offset, loop, volume, pan, startTime, duration) {
	if (this.soundIsOn() === false) { //sort of IE9 fix...
		return;
	}
	return createjs.Sound.play(src, interrupt, delay, offset, loop, volume, pan, startTime, duration);
};

/**
* ...
*
* @param AssetManager assetManager
* @return sound instance
*/
SoundManager.prototype.playInstance = function(soundInstance) {
	if (this.soundIsOn() === false) { //sort of IE9 fix...
		return;
	}
	return soundInstance.play();
};

/**
 * Appends the SoundManager onto the element.
 *
 * @return boolean
 */
SoundManager.prototype.toggleSound = function() {
	createjs.Sound.setMute(!createjs.Sound.getMute());
	return this.soundIsOn();
};

/**
* ...
*
* @return boolean
*/
SoundManager.prototype.soundIsOn = function() {
	return !createjs.Sound.getMute();
};

fragment.soundManager = new SoundManager();
