var chai = require('chai');
var expect = chai.expect;

var Client = require('../../lib/Client');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *           YOU MUST ENTER YOUR CROSS BROWSER TESTING CREDENTIALS           *
 *                 FOR THE FUNCTIONAL TESTS TO RUN CORRECTLY                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var config = {
    username: '',
    password: ''
};


// Exit early if the API credentials haven't been entered.  Don't return an
// error if running on Travis
if (!config.username || !config.password) {
    console.error('\n\x1B[31m', 'To run functional tests, you must enter a username and password.', '\x1B[39m\n');
    process.exit(!process.env.TRAVIS);
}

describe('Acceptance', function() {

    var testFixture;
    var versionFixture;
    var resultFixture;

    it('should client.listScreenshotBrowsers should return the expected result', function(done) {
        var client = new Client(config);

        client.listScreenshotBrowsers(function(err, body) {
            if (err) return done(err);

            expect(body.oss).to.exist;
            expect(body.oss).to.be.an('array');
            expect(body.oss.length).to.be.at.least(1);
            expect(body.oss[0].name).to.exist;
            expect(body.oss[0]['api_name']).to.exist;

            done();
        });
    });

    it('should client.runNewScreenshotTest should return the expected result', function(done) {
        var client = new Client(config);

        client.runNewScreenshotTest({
            url: 'http://example.com',
            browsers: ['IE11']
        }, function(err, body) {
            if (err) return done(err);

            expect(body.test).to.exist;
            expect(body.test.id).to.exist;
            expect(body.test.version).to.exist;

            done();
        });
    });

    it('should client.showScreenshotTests should return the expected result', function(done) {
        var client = new Client(config);

        client.showScreenshotTests(function(err, body) {
            if (err) return done(err);

            expect(body['test_count']).to.exist;
            expect(body.tests).to.exist;
            expect(body.tests).to.be.an('array');
            expect(body.tests.length).to.be.at.least(1);
            expect(body.tests.length).to.equal(Math.min(100, body['test_count']));
            expect(body.tests[0].id).to.exist;
            expect(body.tests[0].url).to.exist;

            testFixture = body.tests[0];

            done();
        });
    });

    it('should client.showScreenshotTestVersions should return the expected result', function(done) {
        var client = new Client(config);

        client.showScreenshotTestVersions(testFixture.id, function(err, body) {
            if (err) return done(err);

            expect(body.test).to.exist;
            expect(body.test.id).to.equal(testFixture.id);
            expect(body.test.url).to.equal(testFixture.url);
            expect(body.test['version_count']).to.equal(testFixture['version_count']);

            versionFixture = body.test.versions[0];

            done();
        });
    });

    it('should client.showScreenshotVersionResults should return the expected result', function(done) {
        var client = new Client(config);

        client.showScreenshotVersionResults(testFixture.id, versionFixture.id, function(err, body) {
            if (err) return done(err);

            expect(body.test).to.exist;
            expect(body.test.id).to.equal(testFixture.id);
            expect(body.test.url).to.equal(testFixture.url);
            expect(body.test.version.id).to.equal(versionFixture.id);
            expect(body.test.version['run_date']).to.equal(versionFixture['run_date']);
            expect(body.test.version.results).to.exist;
            expect(body.test.version.results).to.be.an('array');
            expect(body.test.version.results.length).to.be.at.least(1);

            resultFixture = body.test.version.results[0];

            done();
        });
    });

    it('should client.repeatScreenshotTest should return the expected result', function(done) {
        var client = new Client(config);

        client.repeatScreenshotTest(testFixture.id, versionFixture.id, function(err, body) {
            if (err) return done(err);

            expect(body.test).to.exist;
            // parseInt required because API erroneously returns ID as string here
            // @TODO: Fix this in the Client
            expect(parseInt(body.test.id, 10)).to.equal(testFixture.id);
            expect(body.test.url).to.equal(testFixture.url);
            expect(body.test.version.id).to.not.equal(versionFixture.id);

            done();
        });
    });

    it('should client.getScreenshotTestStatus should return the expected result', function(done) {
        var client = new Client(config);

        client.getScreenshotTestStatus(testFixture.id, versionFixture.id, function(err, body) {
            if (err) return done(err);

            expect(body.complete).to.exist;

            done();
        });
    });

    it('should client.retakeScreenshotTest should return the expected result', function(done) {
        var client = new Client(config);

        client.retakeScreenshotTest(resultFixture.id, function(err, body) {
            if (err) return done(err);

            expect(body.test).to.exist;
            // parseInt required because API erroneously returns ID as string here
            // @TODO: Fix this in the Client
            expect(parseInt(body.test.id, 10)).to.equal(testFixture.id);
            expect(body.test.version).to.exist;
            // parseInt required because API erroneously returns ID as string here
            // @TODO: Fix this in the Client
            expect(parseInt(body.test.version.id, 10)).to.equal(versionFixture.id);

            done();
        });
    });

});
