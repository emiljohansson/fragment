describe('Event', function() {
    var el = document.createElement('div');
    var responses = 0;
    function onClick() {
        responses++;
    }
    it('should add event listener', function() {
        expect(fragment.Event.addEventListener()).to.be.equal(undefined);
        expect(fragment.Event.addEventListener([])).to.be.equal(undefined);
        expect(fragment.Event.addEventListener(el, 'click', onClick)).to.be.equal(el);

        var ieTest = {
            attachEvent: function(a, b, c) {}
        };
        expect(fragment.Event.addEventListener(ieTest, 'click', onClick)).to.be.equal(ieTest);
    });

    it('should add multiple event listeners', function() {
        var els = [
            document.createElement('div'),
            document.createElement('a'),
            document.createElement('span')
        ];
        expect(fragment.Event.addEventListener(els, 'click', onClick)).to.be.equal(undefined);
    });

    it('should dispatch event listener', function() {
        expect(fragment.Event.triggerEvent()).to.be.equal(undefined);
        expect(responses).to.be.equal(0);
        expect(Event.triggerEvent(el, 'click')).to.be.equal(el);
        expect(responses).to.be.equal(1);
    });

    it('should remove event listener', function() {
        expect(responses).to.be.equal(1);
        expect(fragment.Event.removeEventListener()).to.be.equal(undefined);
        expect(fragment.Event.removeEventListener([])).to.be.equal(undefined);
        expect(fragment.Event.removeEventListener(el, 'click', onClick)).to.be.equal(el);

        expect(Event.triggerEvent(el, 'click')).to.be.equal(el);
        expect(responses).to.be.equal(1);

        var ieTest = {
            detachEvent: function(a, b, c) {}
        };
        expect(fragment.Event.removeEventListener(ieTest, 'click', onClick)).to.be.equal(ieTest);
    });

    it('should correct current target', function() {
        var a = {
            currentTarget: 'good browser'
        },
        b = {
            srcElement: 'the other one'
        };
        expect(Event.currentTarget(a)).to.be.equal(a.currentTarget);
        expect(Event.currentTarget(b)).to.be.equal(b.srcElement);
    });
});
