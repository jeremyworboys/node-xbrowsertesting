
module.exports = Client;

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
