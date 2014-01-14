
var pkg = require('../package.json');
var Client = require('./Client');

module.exports = {
    version: pkg.version,
    createClient: createClient,
    Client: Client
};

/**
 * No Operation
 *
 * @return {null}
 */
var noop = function(){};

/**
 * Create new client
 *
 * @param  {Object}   config
 * @param  {Function} cb
 * @return {Client}
 */
function createClient(config, cb) {
    var client;
    cb = cb || noop;

    try {
        client = new Client(config);
    }
    catch (err) {
        return cb(err), err;
    }

    return cb(null, client), client;
}
