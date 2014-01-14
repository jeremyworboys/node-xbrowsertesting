var chai = require('chai');
var expect = chai.expect;

var Client = require('../lib/Client');

describe('Client', function() {

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

});
