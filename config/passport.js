/**
 * Created by Usuario on 16/12/2015.
 */

var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('../modelos/empresa');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(obj, done){
        done(null, obj);
    });

    passport.use(new FacebookStrategy({

            clientID : configAuth.facebookAuth.clientID,
            clientSecret : configAuth.facebookAuth.clientSecret,
            callbackURL : configAuth.facebookAuth.callbackURL,
            profileFields : configAuth.facebookAuth.profileFields
        },
        myFacebookStrategy)
    );
}


function myFacebookStrategy(token, refreshToken, profile, done){

    process.nextTick(function(){
        var newUser = Object();
        newUser.id = profile.id;
        newUser.name = profile.displayName;
        newUser.email = profile.emails[0].value;
        newUser.pic = profile.photos[0].value;
        newUser.provider = profile.provider;
        newUser.token = token;
        User.create(
            {
                nombre: profile.displayName,
                apellidos: profile.id,
                email: profile.emails[0].value,
                password: "facebook",
                fecha_nacimiento: profile.provider

            }
        );
        console.log("USUSARIO FB +++++++++++++ ");
        return done(null, newUser);
    });
}


