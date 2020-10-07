
var JwtStrategy = require('passport-jwt').Strategy,
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');

var config = require('./database');
module.exports = function(passport){

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secrete;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
User.getuserById(jwt_payload.id, function(err, user) {
    if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
        // or you could create a new account
    }
});
}));

}


