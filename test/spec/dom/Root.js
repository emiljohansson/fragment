describe('Root', function () {
    it('should exist and appended to document.body', function() {
        assert(!!fragment.root);
        assert(fragment.root.parent === null);
        assert(!!fragment.root.getElement());
        assert(fragment.root.getElement().parentElement === document.body);
        assert(fragment.root.getElement().id === "root");
    });
});
