describe('Anchor', function () {
    before(function() {
        this.el = new fragment.Anchor('google.com', 'Google');
    });

    it('should be a <a> element', function() {
        expect(this.el.getElement().tagName).to.be.equal('A');
    });

    it('should get/set content', function() {
        expect(this.el.html()).to.be.equal('Google');
        this.el.html('');
        expect(this.el.html()).to.be.equal('');
        this.el.html('Yahoo');
        expect(this.el.html()).to.be.equal('Yahoo');
    });

    it('should get/set href attribute', function() {
        expect(this.el.href()).to.be.equal('google.com');
        this.el.href('yahoo.com');
        expect(this.el.href()).to.be.equal('yahoo.com');
    });
});
