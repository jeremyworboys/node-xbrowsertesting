
var pkg = require('../package.json');
var Client = require('./Client');

module.exports = {

    version: pkg.version,

    Client: Client,

    createClient: function(config) {
        var client = new Client(config);

        return client;
    }

};
