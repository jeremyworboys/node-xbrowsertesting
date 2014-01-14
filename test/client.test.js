var chai = require('chai');
var expect = chai.expect;

var Client = require('../lib/Client');

describe('Client', function() {

    var config = {
        username: 'username',
        password: 'secretpassword'
    };

    var makeRequestStub = function(url) {
        return function(options, done) {
            expect(options.url).to.equal(url);
            done();
        };
    };

    it('should throw an error when the config is missing', function() {
        var error;
        try { new Client(); }
        catch (err) { error = err; }

        expect(error).to.exist;
        expect(error.message).to.contain('missing');
    });

    it('should throw an error when the config is invalid', function() {
        var error;
        try { new Client('fake'); }
        catch (err) { error = err; }

        expect(error).to.exist;
        expect(error.message).to.contain('invalid');
    });

    it('should be able to make raw API calls', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://example.com');

        expect(client).to.respondTo('raw');

        client.raw('http://example.com', done);
    });

});
