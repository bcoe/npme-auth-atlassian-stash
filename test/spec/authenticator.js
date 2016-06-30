var Authenticator = require('../../authenticator');

describe('authenticator', function () {
    var authenticator = new Authenticator();

    it('should pass valid data after authentication', function (done) {
        authenticator.authenticate({
            body: {
                name: 'cconrad',
                password: 'password',
                email: 'chrisconrad@doamin.com'
            }
        }, function (error, data) {
            expect(error).to.be.null;
            expect(data).to.have.property('token', '8a75dd8e9061f819430b7f2a05bee19a5b18e3f926b8916503f24c28f5b12d44');
            done();
        });
    });

    it('ignores differing case in email', function (done) {
        authenticator.authenticate({
            body: {
                name: 'bob',
                password: 'bob',
                email: 'bob@domain.com'
            }
        }, function (error, data) {
            expect(error).to.be.null;
            expect(data.user.email).to.equal('Bob@domain.com');
            expect(data).to.have.property('token', '3dbfc51334ccb878384ce927abd00068d47bde68cce14f5171ddc22b7897b95e');
            done();
        });
    });
});
