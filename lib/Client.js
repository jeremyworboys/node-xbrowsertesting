
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

    this.username = config.user || config.username;
    this.password = config.pass || config.password;

    if (!this.username || !this.password) {
        throw new Error('Configuration is invalid - you must define a username and password');
    }
}

Client.prototype.methodName = function() {
    // body...
};
