const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const axios = require('axios');
const config = require('../config/config');

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    clientID: config.outlookClientId,
    clientSecret: config.outlookClientSecret,
    callbackURL: config.redirectUri
},
(accessToken, refreshToken, profile, done) => {
    axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => done(null, { profile: response.data, accessToken }))
    .catch(error => done(error));
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
