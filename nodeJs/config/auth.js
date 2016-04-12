var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../modules/user/module')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
    User.signin({
        email: email,
        password: password
    }, function(err, user) {
        done(err, user, {
            text: 'you was logined'
        });
    });
}));


module.exports = function(server) {
    server.use(passport.initialize());
    server.use(passport.session());
    return server;
};