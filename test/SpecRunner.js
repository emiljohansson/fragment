require.config({
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'lodash': '../bower_components/lodash/dist/lodash.compat',
		'hammer': '../bower_components/hammerjs/hammer',
		'fragment': '../app/scripts/fragment/fragment',
		'mocha': 'bower_components/mocha/mocha',
		'chai': 'bower_components/chai/chai'
	},
	shim: {},
	priority: [],
	baseUrl: './',
	urlArgs: 'bust=' + (new Date()).getTime()
});

require(['require', 'chai', 'mocha'], function(require, chai){

	/*globals mocha */
	mocha.setup('bdd');

  // Chai
	window.assert = chai.assert;
	window.expect = chai.expect;
	window.should = chai.should();

	require([
		'spec/fragment/fragment.spec.js'
		], function(require) {
			mocha.run();
	});

});
