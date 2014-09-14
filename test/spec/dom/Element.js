describe('Element', function () {

    describe('Event handling', function() {
        var responses = 0;
        function onClick() {
            responses++;
        }
        var customCt = 0;
        function onCustom() {
            customCt++;
        }

        before(function() {
            this.el = new fragment.Element();
        });

        it('should be a div element', function() {
            expect(this.el.getElement().tagName).to.be.equal('DIV');
        });

        it('_inEventList should return true for click events', function() {
            assert(this.el._inEventList('click') === true);
            assert(this.el._inEventList('coolEvent') === false);
        });

        it('should listen to click event', function() {
            this.el.addEventListener.should.be.a('function');
            expect(responses).to.be.equal(0);
            this.el.addEventListener('click', onClick);
            this.el.dispatchListener('click');
            expect(responses).to.be.equal(1);
        });

        it('should listen to custom event', function() {
            expect(customCt).to.be.equal(0);
            this.el.addEventListener('myCustomEvent', onCustom);
            this.el.dispatchListener('myCustomEvent');
            expect(customCt).to.be.equal(1);
        });

        it('should stop listen to click event', function() {
            this.el.removeEventListener.should.be.a('function');
            expect(responses).to.be.equal(1);
            this.el.removeEventListener('click', onClick);
            this.el.dispatchListener('click');
            expect(responses).to.be.equal(1);
        });

        it('should set and get DOMElement', function() {
            var curr = this.el.getElement();
            var newEl = document.createElement('span');
            this.el.setElement(newEl);
            expect(this.el.getElement()).to.equal(newEl);
            expect(this.el.getElement().tagName).to.equal('SPAN');
            this.el.setElement(curr);
            expect(this.el.getElement()).to.equal(curr);
        });

        it('should dispose DOMElement and its listeners', function() {
            var tempEl = this.el.getElement();
            this.el.addEventListener('click', onClick);
            this.el.dispose();
            expect(this.el.getElement()).to.be.equal(null);
            Event.triggerEvent(tempEl, 'click');
            expect(responses).to.be.equal(1);

            this.el.dispatchListener('myCustomEvent');
            expect(customCt).to.be.equal(1);
        });
    });

    describe('HTML and CSS', function() {
        before(function() {
            this.el = new fragment.Element();
        });

        it('should hide the element', function() {
            var tempEl = this.el.getElement();
            this.el.setVisible(false);
            expect(tempEl.style.top).to.be.equal('-9999px');
            expect(tempEl.style.left).to.be.equal('-9999px');
            expect(tempEl.style.position).to.be.equal('absolute');
            this.el.setVisible(true);
            expect(tempEl.style.top).to.be.equal('');
            expect(tempEl.style.left).to.be.equal('');
            expect(tempEl.style.position).to.be.equal('');
        });

        it('should set and return innerHTML', function() {
            var innerHtml = this.el.html('asd');
            expect(innerHtml).to.be.equal('asd');
            expect(this.el.getElement().innerHTML).to.be.equal('asd');
        });

        it('should add a class name', function() {
            this.el.addStyleName('test_name');
            expect(this.el.getElement().className.indexOf('test_name')).to.be.gte(0);
        });

        it('should remove a class name', function() {
            this.el.removeStyleName('test_name');
            expect(this.el.getElement().className.indexOf('test_name')).to.be.equal(-1);
        });
    });

    describe('Add, remove and find children', function() {
        before(function() {
            this.childEl = fragment.Element.create();
        });
        it('should add a child element', function() {
            expect(this.el.getElement().children.length).to.be.equal(0);
            this.childEl.appendTo(this.el);
            expect(this.el.getElement().children.length).to.be.equal(1);
        });

        it('should find the child element', function() {
            expect(this.el.find('div')).to.be.equal(this.childEl.getElement());
        });

        it('should remove the child element', function() {
            this.childEl.removeFromParent();
            expect(this.el.getElement().children.length).to.be.equal(0);
        });
    });

    describe('Fractory methods', function() {

        it('should set custom DOMElement', function() {
            var tempEl = document.createElement('a');
            var el = Element.createWithElement(tempEl);
            expect(el.getElement()).to.be.equal(tempEl);
            try {
                Element.createWithElement();
            }
            catch (e) {}
        });

        it('should set DOMElement with span tag', function() {
            var el = Element.create('span');
            expect(el.getElement().tagName).to.be.equal('SPAN');
            el = Element.create();
            expect(el.getElement().tagName).to.be.equal('DIV');
        });
    });
});
