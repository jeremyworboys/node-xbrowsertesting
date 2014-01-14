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

    it('should request the right url for client.listScreenshotBrowsers', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://crossbrowsertesting.com/api/v2/screenshots/browsers');

        expect(client).to.respondTo('listScreenshotBrowsers');

        client.listScreenshotBrowsers(done);
    });

    it('should request the right url for client.runNewScreenshotTest', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://crossbrowsertesting.com/api/v2/screenshots/run');

        expect(client).to.respondTo('runNewScreenshotTest');

        client.runNewScreenshotTest(done);
    });

    it('should request the right url for client.showScreenshotTests', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://crossbrowsertesting.com/api/v2/screenshots/show');

        expect(client).to.respondTo('showScreenshotTests');

        client.showScreenshotTests(done);
    });

    it('should request the right url for client.showScreenshotTestVersions', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://crossbrowsertesting.com/api/v2/screenshots/1111/show');

        expect(client).to.respondTo('showScreenshotTestVersions');

        client.showScreenshotTestVersions(1111, done);
    });

    it('should request the right url for client.showScreenshotVersionResults', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://crossbrowsertesting.com/api/v2/screenshots/1111/version/2222/show');

        expect(client).to.respondTo('showScreenshotVersionResults');

        client.showScreenshotVersionResults(1111, 2222, done);
    });

    it('should request the right url for client.repeatScreenshotTest', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://crossbrowsertesting.com/api/v2/screenshots/1111/version/2222/repeat');

        expect(client).to.respondTo('repeatScreenshotTest');

        client.repeatScreenshotTest(1111, 2222, done);
    });

    it('should request the right url for client.getScreenshotTestStatus', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://crossbrowsertesting.com/api/v2/screenshots/1111/version/2222/status');

        expect(client).to.respondTo('getScreenshotTestStatus');

        client.getScreenshotTestStatus(1111, 2222, done);
    });

    it('should request the right url for client.retakeScreenshotTest', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://crossbrowsertesting.com/api/v2/screenshots/result/3333/retake');

        expect(client).to.respondTo('retakeScreenshotTest');

        client.retakeScreenshotTest(3333, done);
    });


    it('should be able to make raw API calls', function(done) {
        var client = new Client(config);
        Client.request = makeRequestStub('http://example.com');

        expect(client).to.respondTo('raw');

        client.raw('http://example.com', done);
    });

});
