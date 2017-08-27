import oauth2orize from 'oauth2orize';
import passport from 'passport';
import crypto from 'crypto';

const User = require('../models/Users');
const AccessToken = require('../models/Tokens');
const RefreshToken = require('../models/Refreshtoken');

// create OAuth 2.0 server
const aserver = oauth2orize.createServer();

// Generic error handler
const errFn = (cb, err) => {
	if (err) {
		return cb(err);
	}
};

// Destroys any old tokens and generates a new access and refresh token
const generateTokens = (data, done) => {

	// curries in `done` callback so we don't need to pass it
    var errorHandler = errFn.bind(undefined, done),
	    refreshToken,
	    refreshTokenValue,
	    token,
	    tokenValue;

    RefreshToken.remove(data, errorHandler);
    AccessToken.remove(data, errorHandler);

    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');

    data.token = tokenValue;
    token = new AccessToken(data);

    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);

    refreshToken.save(errorHandler);

    token.save((err) => {
    	if (err) {
			// log.error(err);
    		return done(err);
    	}
    	done(null, tokenValue, refreshTokenValue, {
    		'expires_in': 3600
    	});
    });
};

// Exchange username & password for access token.
aserver.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {

	User.findOne({ username: username }, (err, user) => {

		if (err) {
			return done(err);
		}

		if (!user || !user.checkPassword(password)) {
			return done(null, false);
		}

		let model = {
			userId: user.userId,
			clientId: client.clientId
		};

		generateTokens(model, done);
	});

}));

// Exchange refreshToken for access token.
aserver.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {

	RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, (err, token) => {
		if (err) {
			return done(err);
		}

		if (!token) {
			return done(null, false);
		}

		User.findById(token.userId, (err, user) => {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }

			let model = {
				userId: user.userId,
				clientId: client.clientId
			};

			generateTokens(model, done);
		});
	});
}));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

exports.token = [
	passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
	aserver.token(),
	aserver.errorHandler()
];