'use strict';

/*jshint unused: false */
/*globals mocha */
mocha.setup('bdd');

// Chai
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('/dom', function() {

    describe('EventDispatcher', function () {
        var ed = new fragment.EventDispatcher();
        var responses = 0;
        function onTestHandler() {
            responses++;
        }
        it('should listen and respond', function() {
            expect(responses).to.be.equal(0);
            ed.addEventListener('testEvent', onTestHandler);
            var tempEd = ed.dispatchListener('testEvent');
            expect(tempEd).to.be.equal(ed);
            expect(responses).to.be.equal(1);
            tempEd = ed.dispatchListener('notSetEvent');
            expect(tempEd).to.be.equal(ed);
            expect(responses).to.be.equal(1);
        });
        it('should remove event and not respond', function() {
            expect(responses).to.be.equal(1);
            var tempEd = ed.removeEventListener('testEvent', onTestHandler);
            expect(tempEd).to.be.equal(ed);
            tempEd = ed.removeEventListener('notSetEvent', onTestHandler);
            expect(tempEd).to.be.equal(ed);
            ed.dispatchListener('testEvent');
            expect(responses).to.be.equal(1);
        });
        it('should dispose all listeners', function() {
            expect(responses).to.be.equal(1);
            ed.addEventListener('testEvent', onTestHandler);
            ed.dispatchListener('testEvent');
            expect(responses).to.be.equal(2);
            ed.dispose();
            expect(ed._listeners).to.be.empty;
            ed.dispatchListener('testEvent');
            expect(responses).to.be.equal(2);
        });
    });

    describe('Element', function () {
        var el = new fragment.Element();
        var responses = 0;
        function onClick() {
            responses++;
        }

        it('should be a div element', function() {
            expect(el.getElement().tagName).to.be.equal('DIV');
        });

        it('_inEventList should return true for click events', function() {
            assert(el._inEventList('click') === true);
            assert(el._inEventList('coolEvent') === false);
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

    describe('Root', function () {
        it('should exist and appended to document.body', function() {
            assert(!!fragment.root);
            assert(fragment.root.parent === null);
            assert(!!fragment.root.getElement());
            assert(fragment.root.getElement().parentElement === document.body);
            assert(fragment.root.getElement().id === "root");
        });
    });

});

mocha.run();
