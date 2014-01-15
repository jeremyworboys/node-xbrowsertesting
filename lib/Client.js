
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
Client.prototype.runNewScreenshotTest = function(params, cb) {
    this.raw(runUrl, params, cb);
};

/**
 * List of all screenshot tests that have been run
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.showScreenshotTests = function(params, cb) {
    this.raw(testsUrl, params, cb);
};

/**
 * List of versions for a screenshot test
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.showScreenshotTestVersions = function(testId, params, cb) {
    var url = versionsUrl.replace('[test_id]', testId);

    this.raw(url, params, cb);
};

/**
 * List of results from a screenshot test version with links to the screenshot
 * image results
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.showScreenshotVersionResults = function(testId, versionId, params, cb) {
    var url = resultsUrl
        .replace('[test_id]', testId)
        .replace('[version_id]', versionId);

    this.raw(url, params, cb);
};

/**
 * Run a new version of an existing screenshot test on the same URL and browsers
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.repeatScreenshotTest = function(testId, versionId, params, cb) {
    var url = repeatUrl
        .replace('[test_id]', testId)
        .replace('[version_id]', versionId);

    this.raw(url, params, cb);
};

/**
 * Get status of a test with reduced overhead
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.getScreenshotTestStatus = function(testId, versionId, params, cb) {
    var url = statusUrl
        .replace('[test_id]', testId)
        .replace('[version_id]', versionId);

    this.raw(url, params, cb);
};

/**
 * Retake a single screenshot on a single browser from a screenshot test version
 *
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.retakeScreenshotTest = function(resultId, params, cb) {
    var url = retakeUrl.replace('[result_id]', resultId);

    this.raw(url, params, cb);
};

/**
 * Raw API call
 *
 * @param  {String}   url
 * @param  {Function} cb
 * @return {null}
 */
Client.prototype.raw = function(url, params, cb) {
    if (typeof params === 'function') {
        cb = params;
        params = {};
    }

    params = defaults(params, { format: 'json' });

    var options = {
        auth: this.auth,
        url:  url,
        qs:   params,
        json: (params.format === 'json')
    };

    Client.request(options, function(err, res, body) {
        if (err) return cb(err);

        if (res.statusCode !== 200) {
            err = new Error('The server did not respond OK - it is most likely due to invalid credentials');
            err.code = res.statusCode;
            return cb(err);
        }

        if (body.response.error) {
            err = new Error(body.response.message);
            err.code = body.response.error;
            return cb(err);
        }

        // Clean up error info because if there is an error it will have
        // already been thrown
        delete body.response.error;
        delete body.response.message;

        cb(null, body.response);
    });
};

/**
 * Apply default values to object
 *
 * @param  {Object} obj
 * @param  {Object} defaults
 * @return {Object}
 */
function defaults(obj, defs) {
    obj = obj || {};

    Object.keys(defs).map(function(key) {
        if (obj.hasOwnProperty(key)) return;
        obj[key] = defs[key];
    });

    return obj;
}
