var chai = require('chai');
var expect = chai.expect;

var xBrowserTest = require('../');

describe('xBrowserTest', function() {

    it('should expose the client version', function() {
        var pkg = require('../package.json');

        expect(xBrowserTest.version).to.equal(pkg.version);
    });

    it('should expose a `createClient` method', function() {
        expect(xBrowserTest).itself.to.respondTo('createClient');
    });

});
