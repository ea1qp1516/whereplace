var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = function(app, passport){
//route for showing the profile page
    app.get('/auth/facebook/profile', isAuth,  function(req, res, next) {
        //console.log("B\nB\nB\nB\nBBBB\nB\nB\nBBBBBBBBBBBB" + req.user.name);
        res.redirect("http://localhost:3000/#/main");
    });
//route for logging out
    app.get('/logout', function(req, res, next) {
        req.logout();
        res.redirect('/');
    });
//facebook authentication
    app.get('/auth/facebook',passport.authenticate('facebook', {
        scope: ['public_profile', 'email'] }));


    app.get('/auth/facebook/callback',passport.authenticate ('facebook', {
        successRedirect: 'profile',
        failureRedirect: '/'
    }));

    //twitter authentication

    app.get('/auth/twitter/profile', isAuth,  function(req, res, next) {
        //console.log("B\nB\nB\nB\nBBBB\nB\nB\nBBBBBBBBBBBB" + req.user.name);
        res.redirect("http://localhost:3000/#/main");
    });
    app.get('/auth/twitter',passport.authenticate('twitter', {
        scope: ['public_profile', 'email'] }));

    app.get('/auth/twitter/callback',passport.authenticate ('twitter', {
        successRedirect: 'profile ',
        failureRedirect: '/'
    }));



    function isAuth (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    module.exports = router;

}
