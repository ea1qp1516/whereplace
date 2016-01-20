/**
 * Created by Usuario on 16/12/2015.
 */

var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
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
                //console.log("EL PERfiL QUE SE le PASa A STRATEGY " +profile.emails[0].value);
                var newUser = Object();
                newUser.id = profile.id;
                newUser.name = profile.name.givenName;
                newUser.apellidos = profile.name.familyName;
                newUser.email = profile.emails[0].value;
                newUser.avatar = profile.photos[0].value;
                newUser.provider = profile.provider;
                newUser.token = token;
                console.log("EREREREREERRE" + profile.name);
                User.findOne({"email" : newUser.email }, function(err, user){
                    if (err)
                        return done(err);

                    if (user){
                        //console.log("********* USUARIO YA CREADO, NO GUARDAR");
                        return done(null, user);
                    }else{
                        User.create(
                            {
                                nombre: profile.displayName,
                                apellidos: " ",
                                email: profile.emails[0].value,
                                avatar : profile.photos[0].value,
                                socialID : 1,
                                password: "facebook",
                                fecha_nacimiento: profile.provider

                            });
                    }


                });
                //console.log("USUSARIO FB +++++++++++++ ");
                return done(null, newUser);
            });
        }


        )
    );
    passport.use(new TwitterStrategy({
        consumerKey : configAuth.twitterAuth.clientID,
        consumerSecret : configAuth.twitterAuth.clientSecret,
        callbackURL : configAuth.twitterAuth.callbackURL

    }, function(token, tokenSecret, profile, done){
        console.log(profile);
        User.findOne({nombre : profile.username}, function(err, user){
            if(err) throw(err)

            if(!err && user!=null) return done(null,user);

            var user = new User({
                nombre: profile.username,
                avatar : profile.photos[0].value,
                apellidos: "",
                socialID : 2,
                password: "twitter"

            });
            user.save(function (err){
                if(err) throw(err);
                done(null, user);
            });
        });
    }
    ))


}


