var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = function(app, passport){
//route for showing the profile page
    app.get('/profile', isAuth,  function(req, res, next) {
        res.redirect('profile', { title: 'Your profile page', user: req.user });
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
        successRedirect: 'http://localhost:3000/#/profile',
        failureRedirect: '/'
    }));

    function isAuth (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    module.exports = router;

}
