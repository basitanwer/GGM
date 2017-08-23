'use strict';
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Schema = mongoose.Schema;
var Category = mongoose.model('Category');

/* GET home page. */
router.get('/', function (req, res) {
    Category.find({}, function (err, cats) {
        if (err) {
            console.log(err);
        } else {
            //res.render('navigation', cats);

            var navigation = [];
            for (var i = 0; i < cats.length; i++) {
                var object = {
                    id: cats[i].id,
                    original_id: cats[i].id,
                    name: cats[i].category,
                    type: "category",
                    weight: 0,
                    graph_id: cats[i].id,
                    children: []
                };
                navigation.push(object);
            }

            var pages = [
                {
                    id: 24,
                    name: "Terms"
                }];

            var obj = {
                navigation: navigation,
                pages: pages
            };

            res.setHeader('Content-Type', 'application/json');
            res.json(obj);

            //res.json({ categories: "asdf" });
            
            console.log('retrieved list of categories', cats.length, cats[0].category);
        }
    })
});

module.exports = router;
