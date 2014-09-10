'use strict';

/*jshint unused: false */
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
    it('should dispose all listeners', function() {
        expect(responses).to.be.equal(1);
        ed.addEventListener('testEvent', onTestHandler);
        ed.dispatchListener('testEvent');
        expect(responses).to.be.equal(2);
        ed.dispose();
        ed.dispatchListener('testEvent');
        expect(responses).to.be.equal(2);
    });
});

describe('dom/Element', function () {
    var el = new fragment.Element();
    var responses = 0;
    function onClick() {
        responses++;
    }
    it('should be a div element', function() {
        expect(el.getElement().tagName).to.be.equal('DIV');
    });

    it('should listen to click event', function() {
        el.addEventListener.should.be.a('function');
        expect(responses).to.be.equal(0);
        el.addEventListener('click', onClick);
        el.dispatchListener('click');
        expect(responses).to.be.equal(1);
    });

    it('should stop listen to click event', function() {
        el.removeEventListener.should.be.a('function');
        expect(responses).to.be.equal(1);
        el.removeEventListener('click', onClick);
        el.dispatchListener('click');
        expect(responses).to.be.equal(1);
    });


    it('should set and get DOMElement', function() {
        var curr = el.getElement();
        var newEl = document.createElement('span');
        el.setElement(newEl);
        expect(el.getElement()).to.equal(newEl);
        expect(el.getElement().tagName).to.equal('SPAN');
        el.setElement(curr);
        expect(el.getElement()).to.equal(curr);
    });
});

describe('dom/Root', function () {
    it('should exist and appended to document.body', function() {
        assert(!!fragment.root);
        assert(fragment.root.parent === null);
        assert(!!fragment.root.getElement());
        assert(fragment.root.getElement().parentElement === document.body);
        assert(fragment.root.getElement().id === "root");
    });
});

mocha.run();
