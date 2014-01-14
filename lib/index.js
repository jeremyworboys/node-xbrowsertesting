
var pkg = require('../package.json');
var Client = require('./Client');

var noop = function(){};

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

module.exports = {
    version: pkg.version,
    createClient: createClient,
    Client: Client
};

