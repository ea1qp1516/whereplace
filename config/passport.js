/**
 * Created by Usuario on 16/12/2015.
 */

var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('./auth');

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(obj, done){
        done(null, obj);
    });

    function myFacebookStrategy(token, refreshToken, profil, done){

        process.nextTick(function(){
            var newUser = Object();
            newUser.id = profile.id;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.pic = profile.photos[0].value;
            newUser.provider = profile.provider;
            newUSer.token = token;

            return done(null, newUser);
        });
    }
}