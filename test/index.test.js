var chai = require('chai');
var expect = chai.expect;

var xBrowserTest = require('../');

describe('xBrowserTest', function() {

    it('should expose the client version', function() {
        var pkg = require('../package.json');

        expect(xBrowserTest.version).to.equal(pkg.version);
    });

    it('should expose the client constructor', function() {
        expect(xBrowserTest.Client).to.exist;
        expect(xBrowserTest.Client).to.be.a('function');
    });

    it('should expose a `createClient` method', function() {
        expect(xBrowserTest.createClient).to.exist;
        expect(xBrowserTest.createClient).to.be.a('function');
    });

    it('createClient should create a new instance of Client', function() {
        var client = xBrowserTest.createClient(null);

        expect(client).to.be.an.instanceOf(xBrowserTest.Client);
    });

    it('createClient should work asynchronously', function(done) {
        xBrowserTest.createClient(null, function(err, client) {
            expect(client).to.be.an.instanceOf(xBrowserTest.Client);

            done(err);
        });
    });

});
