'use strict';

/*globals mocha */
mocha.setup('bdd');

// Chai
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Fragment core', function () {
    it('should be a string', function () {
        assert.equal(fragment.isString(), false);
        assert.equal(fragment.isString(null), false);
        assert.equal(fragment.isString('null'), true);
        assert.equal(fragment.isString(''), true);
    });
    it('should be set', function () {
        assert.equal(fragment.isSet(), false);
        assert.equal(fragment.isSet(null), false);
        assert.equal(fragment.isSet(undefined), false);
        assert.equal(fragment.isSet('null'), true);
        assert.equal(fragment.isSet(''), true);
        assert.equal(fragment.isSet(0), true);
        assert.equal(fragment.isSet(1), true);
        assert.equal(fragment.isSet('undefined'), true);
    });
});

describe('dom/EventDispatcher', function () {
    var ed = new fragment.EventDispatcher();
    var responses = 0;
    function onTestHandler() {
        responses++;
    }
    it('should listen and respond', function() {
        expect(responses).to.be.equal(0);
        ed.addEventListener('testEvent', onTestHandler);
        ed.dispatchListener('testEvent');
        expect(responses).to.be.equal(1);
    });
    it('should remove event and not respond', function() {
        expect(responses).to.be.equal(1);
        ed.removeEventListener('testEvent', onTestHandler);
        ed.dispatchListener('testEvent');
        expect(responses).to.be.equal(1);
    });
});

mocha.run();
