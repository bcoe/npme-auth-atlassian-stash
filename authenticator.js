/**
 * @see https://github.com/bcoe/npme-auth-foo#writing-an-authenticator
 * @constructor
 */

var _ = require('lodash');
var stash = require('./stash');

function Authenticator() {
    _.extend(this, stash);
};

Authenticator.prototype.authenticate = function (_credentials, _cb) {
    var self = this;
    var credentials = _credentials.body;

    if (!credentials) {
        return _cb(new Error('Missing credentials'));
    }

    var user = this.client.user(credentials.name, credentials.password);

    try {
        user.authorize().then(function (_stashData) {
            if (!_stashData) {
                return _cb(new Error('Invalid StashUser object'));
            }
            if (credentials.email && _stashData.user.email.toLowerCase() !== credentials.email.toLowerCase()) {
                return _cb(new Error('Invalid StashUser email'));
            }

            self.logger.debug('Authorization success', _stashData);
            _cb(null, _stashData);
        }).catch(_cb);
    } catch (_error) {
        self.logger.error('Authorization failure', _error);
        _cb(_error);
    }
};

module.exports = Authenticator;
