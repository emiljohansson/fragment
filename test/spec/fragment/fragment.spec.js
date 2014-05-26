/* global describe, it */

define(function(require) {
	'use strict';

	var fragment = require('fragment');

	describe('Fragment', function () {
		it('should be a string', function () {
			assert.equal(fragment.isString(), false);
			assert.equal(fragment.isString(null), false);
			assert.equal(fragment.isString('null'), true);
			assert.equal(fragment.isString(''), true);
		});
	});
});
