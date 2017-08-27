import passport from 'passport';
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../models/Users');
const Client = require('../models/Clients');
const AccessToken = require('../models/Tokens');
const RefreshToken = require('../models/Refreshtoken');

passport.use(new BasicStrategy(
    (username, password, done) => {
        Client.findOne({ clientId: username }, (err, client) => {
            if (err) {
            	return done(err);
            }

            if (!client) {
            	return done(null, false);
            }

            if (client.clientSecret !== password) {
            	return done(null, false);
            }

            return done(null, client);
        });
    }
));

passport.use(new ClientPasswordStrategy(
    (clientId, clientSecret, done) => {
        Client.findOne({ clientId: clientId }, (err, client) => {
            if (err) {
            	return done(err);
            }

            if (!client) {
            	return done(null, false);
            }

            if (client.clientSecret !== clientSecret) {
            	return done(null, false);
            }

            return done(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    (accessToken, done) => {
        AccessToken.findOne({ token: accessToken }, (err, token) => {

            if (err) {
            	return done(err);
            }

            if (!token) {
            	return done(null, false);
            }

            if( Math.round((Date.now()-token.created)/1000) > 3600 ) {

                AccessToken.remove({ token: accessToken }, (err) => {
                    if (err) {
                    	return done(err);
                    }
                });

                return done(null, false, { message: 'Token expired' });
            }

            User.findById(token.userId, (err, user) => {

                if (err) {
                	return done(err);
                }

                if (!user) {
                	return done(null, false, { message: 'Unknown user' });
                }

                var info = { scope: '*' };
                done(null, user, info);
            });
        });
    }
));