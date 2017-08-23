'use strict';
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var Schema = mongoose.Schema;
var Login = mongoose.model('Login');


router.post('/', function (req, res) {
    //var emailbody;
    //var passbody ;
    //for (var keys in req.body)
    //{
    //    key = JSON.parse(keys);
    //    emailbody = key.email;
    //    passbody = key.password;
    //    break;
    //}

    //Login.findOne({ email: emailbody }, function (err, login) {
    //    if (err) {
    //        console.log(err);
    //    } else {
    //        if (login)
    //        {

    //        }
    //        else {
    //            Login.create()
    //        } 
    //    });

});

module.exports = router;
