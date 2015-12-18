/**
 * Created by Usuario on 16/12/2015.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next){
    res.render('/paneladmin', {title: 'Oauth Example Facebook'});
});

router.get('/detalles', isAuth, function(req, res, next){
    res.render('detalles', {title:'Your profile page', user : req.user});
});

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.get('/auth/facebook', passport.authenicate('facebook', {scope: ['public_profile', 'email']}));

router.get('/auth/facebook/callback', passport.authenicate('facebook', {successRedirect: '/detalles',
                                                                        failureRedirect: '/'}));


module.exports = router;