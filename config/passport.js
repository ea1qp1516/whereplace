/**
 * Created by Usuario on 16/12/2015.
 */

var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('./auth');
var User = require('../modelos/empresa');

var User = require('../modelos/user');
var util = require('util');
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
        function (token, refreshToken, profile, done){

            process.nextTick(function(){
                console.log(util.inspect(profile, false, null));
                console.log("EL PERfiL QUE SE le PASa A STRATEGY " +profile.emails[0].value);
                var newUser = Object();
                newUser.id = profile.id;
                newUser.name = profile.displayName;
                newUser.email = profile.emails[0].value;
                newUser.pic = profile.photos[0].value;
                newUser.provider = profile.provider;
                newUser.token = token;
                User.findOne({"email" : newUser.email }, function(err, user){
                    if (err)
                        return done(err);

                    if (user){
                        console.log("********* USUARIO YA CREADO, NO GUARDAR");
                        return done(null, user);
                    }else{
                        User.create(
                            {
                                nombre: profile.displayName,
                                apellidos: profile.id,
                                email: profile.emails[0].value,
                                password: "facebook",
                                fecha_nacimiento: profile.provider

                            });
                    }


                });
                console.log("USUSARIO FB +++++++++++++ ");
                return done(null, newUser);
            });
        }


        )
    );
}


