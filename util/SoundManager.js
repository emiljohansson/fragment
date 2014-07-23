/**
 * Base of all plugins.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([], function() {
	'use strict';

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
	 * @param Element element
	 * @return boolean
	 */
	SoundManager.prototype.toggleSound = function() {
		createjs.Sound.setMute(!createjs.Sound.getMute());
		return !createjs.Sound.getMute();
	};

	return new SoundManager();
});
