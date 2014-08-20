/**
 * Constructor method.
 */
function SoundManager() {}

/**
* Plays a sound.
*
* @param AssetManager assetManager
* @return undefined
*/
SoundManager.prototype.play = function(assetId) {
	createjs.Sound.play(assetId);
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
