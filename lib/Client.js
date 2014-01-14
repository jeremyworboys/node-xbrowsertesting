
module.exports = Client;

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
