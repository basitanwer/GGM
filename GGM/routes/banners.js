'use strict';
var express = require('express');
//var mongoose = require('mongoose');

//var Schema = mongoose.Schema;
var router = express.Router();
//var Category = mongoose.model('Category');


router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
    var obj = {
        metadata: {
            links: {
                first: "http:\/\/77.93.198.186\/v1.2\/21\/banners",
                last: "http:\/\/77.93.198.186\/v1.2\/21\/banners",
                prev: null,
                next: null,
                self: "http:\/\/77.93.198.186\/v1.2\/21\/banners"
            },
            records_count: 3
        },
        records: [
            {
                id: 1095,
                target: "list:67049",
                name: "Shoes",
                image_url: "http:\/\/77.93.198.186\/u\/2016\/05\/03\/1462284245-9.jpg"
                //image_url: "https:\/\/nebula.wsimg.com\/obj\/NjdEQUYwMzcxNzQ3NTI0MUZGNEY6OTE1NTJmYzE4MTBmNWMwNzk4NzJjNzNhYzcxMjI2N2Q6Ojo6OjA=" //"http:\/\/77.93.198.186\/u\/2016\/05\/03\/1462284245-9.jpg"
            },
            {
                id: 1096,
                target: "list:67044",
                name: "T-shirts",
                image_url: "http:\/\/77.93.198.186\/u\/2016\/05\/03\/1462284283-74.jpg"
            },
            {
                id: 1097,
                target: "list:67057",
                name: "Skirts",
                image_url: "http:\/\/77.93.198.186\/u\/2016\/05\/03\/1462284326-39.jpg"
            }
        ]
    };

    res.json(obj);

});

module.exports = router;
