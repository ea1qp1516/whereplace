var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Manuapp Oath' });
});
//route for showing the profile page
router.get('/profile', isAuth,  function(req, res, next) {
    res.render('profile', { title: 'Your profile page', user: req.user });
});
//route for logging out
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});
//facebook authentication
router.get('/auth/facebook',passport.authenticate('facebook', {
    scope: ['public_profile', 'email'] }));

router.get('/auth/facebook/callback',passport.authenticate ('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

function isAuth (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;
