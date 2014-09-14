describe('Fragment core', function () {
    it('should be a string', function () {
        assert.equal(fragment.isString(), false);
        assert.equal(fragment.isString(null), false);
        assert.equal(fragment.isString('null'), true);
        assert.equal(fragment.isString(''), true);
        assert.equal(fragment.isString('asd'), true);
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
