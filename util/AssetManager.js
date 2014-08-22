/**
 * ...
 * @var LoadQueue
 */
var preload = null;

/**
* Constructor method.
*/
function AssetManager() {
	/**
	* Successful downloads.
	* @var int
	*/
	this._successCount = 0;

	/**
	* Number of failed downloads.
	* @var int
	*/
	this._errorCount = 0;

	/**
	* The onComplete method will only be called once, for now.
	* @var int
	* @todo better solution for on demand calls. new class?
	*/
	this._manifestLoaded = false;

	/**
	* Will be triggered for each file loaded.
	* @var function
	*/
	this.onItemLoaded = function() {};

	/**
	* Will be triggered once all files are downloaded.
	* @var function
	*/
	this.onComplete = function() {};

	this._initPreloader();
}

/**
* Initializes createjs preloader.
*
* @return undefined
*/
AssetManager.prototype._initPreloader = function() {
	if (preload !== null) {return;}
	createjs.FlashPlugin.swfPath = "./flash/";
	createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	preload = preload || new createjs.LoadQueue(true);
	preload.installPlugin(createjs.Sound);
	preload.on("fileload", this._handleFileLoaded.bind(this));
	preload.on("error", this._handleFileError.bind(this));
	window.preload = preload;
};

/**
* Loads a single file and calls back when done.
* For now this should only be used after initial loading. It will break
* the default file handle method.
*
* @param string url
* @return undefined
*/
AssetManager.prototype.loadFileOnDemand = function(url) {
	preload.loadFile(url);
};

/**
* Loads an entire manifest file.
*
* @param string manifestFile
* @return undefined
*/
AssetManager.prototype.loadManifest = function(manifestFile, folder) {
	preload.loadFile({src:manifestFile, callback:"maps", type:"manifest"}, true, folder);
};

/**
* Initializes the loaded file.
*
* @param Event event
* @return undefined
*/
AssetManager.prototype._handleFileLoaded = function(event) {
	var item = event.item;
	this.onItemLoaded(item);
	this._successCount++;
	if (this._isDone() && this._manifestLoaded === false) {
		this._manifestLoaded = true;
		this.onComplete();
	}
};

/**
* Handles the failed file.
*
* @param Event event
* @return undefined
*/
AssetManager.prototype._handleFileError = function(/*event*/) {
	this._errorCount++;
	if (this._isDone()) {
		this.onComplete();
	}
};

/**
* ...
*
* @return boolean
*/
AssetManager.prototype._isDone = function() {
	if (this.onUpdate !== null && typeof this.onUpdate === 'function') {
		this.onUpdate(preload.progress);
	}
	return preload.progress >= 1;
};

/**
* ...
*
* @return boolean
*/
AssetManager.prototype._isDone = function() {
	if (this.onUpdate !== null && typeof this.onUpdate === 'function') {
		this.onUpdate(preload.progress);
	}
	return preload.progress >= 1;
};

/**
* ...
*
* @param string id The id from the manifest.
* @return object
*/
AssetManager.prototype.getAsset = function(assetId) {
	var asset = preload.getItem(assetId);
	if (typeof asset === 'undefined') {
		throw 'Asset not found';
	}
	return asset;
};

fragment.assetManager = new AssetManager();
