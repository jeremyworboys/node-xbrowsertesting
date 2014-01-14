
module.exports = Client;

var browsersUrl = 'http://crossbrowsertesting.com/api/v2/screenshots/browsers';
var runUrl      = 'http://crossbrowsertesting.com/api/v2/screenshots/run';
var testsUrl    = 'http://crossbrowsertesting.com/api/v2/screenshots/show';
var versionsUrl = 'http://crossbrowsertesting.com/api/v2/screenshots/[test_id]/show';
var resultsUrl  = 'http://crossbrowsertesting.com/api/v2/screenshots/[test_id]/version/[version_id]/show';
var repeatUrl   = 'http://crossbrowsertesting.com/api/v2/screenshots/[test_id]/version/[version_id]/repeat';
var statusUrl   = 'http://crossbrowsertesting.com/api/v2/screenshots/[test_id]/version/[version_id]/status';
var retakeUrl   = 'http://crossbrowsertesting.com/api/v2/screenshots/result/[result_id]/retake';

/**
 * Constructor
 *
 * @param  {Object} config
 * @return {Client}
 *
 * @throws {Error} If config param is missing
 * @throws {Error} If config param is invalid
 */
function Client(config) {
    if (config == null) {
        throw new Error('Configuration object is missing');
    }

    config.username = config.username || config.user;
    config.password = config.password || config.pass;

    if (!config.username || !config.password) {
        throw new Error('Configuration is invalid - you must define a username and password');
    }

    this.auth = {
        username: config.username,
        password: config.password
    };
}

/**
 * Request library
 *
 * This is purposefully attached to allow tests to inject a mock.
 * This should not be altered in production.
 *
 * @type {Function}
 */
Client.request = require('request');

/**
 * List all browsers available for screenshot testing
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.listScreenshotBrowsers = function(cb) {
    this.raw(browsersUrl, cb);
};

/**
 * Start a new screenshot test on a given URL and browsers
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.runNewScreenshotTest = function(cb) {
    this.raw(runUrl, cb);
};

/**
 * List of all screenshot tests that have been run
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.showScreenshotTests = function(cb) {
    this.raw(testsUrl, cb);
};

/**
 * List of versions for a screenshot test
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.showScreenshotTestVersions = function(testId, cb) {
    var url = versionsUrl.replace('[test_id]', testId);

    this.raw(url, cb);
};

/**
 * List of results from a screenshot test version with links to the screenshot
 * image results
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.showScreenshotVersionResults = function(testId, versionId, cb) {
    var url = resultsUrl
        .replace('[test_id]', testId)
        .replace('[version_id]', versionId);

    this.raw(url, cb);
};

/**
 * Run a new version of an existing screenshot test on the same URL and browsers
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.repeatScreenshotTest = function(testId, versionId, cb) {
    var url = repeatUrl
        .replace('[test_id]', testId)
        .replace('[version_id]', versionId);

    this.raw(url, cb);
};

/**
 * Get status of a test with reduced overhead
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.getScreenshotTestStatus = function(testId, versionId, cb) {
    var url = statusUrl
        .replace('[test_id]', testId)
        .replace('[version_id]', versionId);

    this.raw(url, cb);
};

/**
 * Retake a single screenshot on a single browser from a screenshot test version
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.retakeScreenshotTest = function(resultId, cb) {
    var url = retakeUrl.replace('[result_id]', resultId);

    this.raw(url, cb);
};

/**
 * Raw API call
 *
 * @param  {String}   url
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.raw = function(url, cb) {
    var options = {
        auth: this.auth,
        url: url,
        qs: {
            format: 'json'
        },
        json: true
    };

    Client.request(options, function(err, res, body) {
        cb(err, body);
    });
};
