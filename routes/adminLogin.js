const express = require('express');
const router = express.Router();
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('admin/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/admin/login' }), (req, res) => {
    console.log("Made it in here");
    req.flash('success', 'Welcome back!')
    res.redirect('/admin/services')
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/admin/login');
    });
});

module.exports = router;