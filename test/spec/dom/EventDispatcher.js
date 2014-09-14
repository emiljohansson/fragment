describe('EventDispatcher', function () {
    var responses = 0;
    function onTestHandler() {
        responses++;
    }

    before(function(){
        console.log("setup", this);
        this.ed = new fragment.EventDispatcher();
    });

    it('should create empty object for listeners', function() {
        expect(this.ed._listeners).to.be.empty;
    });

    it('should listen and respond', function() {
        expect(responses).to.be.equal(0);
        this.ed.addEventListener('testEvent', onTestHandler);
        var tempEd = this.ed.dispatchListener('testEvent');
        expect(tempEd).to.be.equal(this.ed);
        expect(responses).to.be.equal(1);
        tempEd = this.ed.dispatchListener('notSetEvent');
        expect(tempEd).to.be.equal(this.ed);
        expect(responses).to.be.equal(1);
    });
    it('should remove event and not respond', function() {
        expect(responses).to.be.equal(1);
        var tempEd = this.ed.removeEventListener('testEvent', onTestHandler);
        expect(tempEd).to.be.equal(this.ed);
        tempEd = this.ed.removeEventListener('notSetEvent', onTestHandler);
        expect(tempEd).to.be.equal(this.ed);
        this.ed.dispatchListener('testEvent');
        expect(responses).to.be.equal(1);
    });
    it('should dispose all listeners', function() {
        expect(responses).to.be.equal(1);
        this.ed.addEventListener('testEvent', onTestHandler);
        this.ed.dispatchListener('testEvent');
        expect(responses).to.be.equal(2);
        this.ed.dispose();
        expect(this.ed._listeners).to.be.empty;
        this.ed.dispatchListener('testEvent');
        expect(responses).to.be.equal(2);
    });
});
