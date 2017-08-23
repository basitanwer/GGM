'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Products = mongoose.model('Product');
var Category = mongoose.model('Category');


router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var catid = req.query.category;
    var sort = req.query.sort;
    var offset = req.query.offset;

    var retObj = {}

    if (offset == 'undefined' || offset == null) {
        offset = 0;
    }

    Products.count({}, function (err, count) {
        if (err) {

        }
        else {

            var fullUrl = req.protocol + '://' + req.get('host');// + req.originalUrl;
            var retUrl = fullUrl + "/21/products?" + "category=" + catid + "&sort=newest"
            var prev = "";
            var next = "";
            var links = {};

            if (offset == 0)
                prev = "";
            else
                prev = offset - 20;

            if (offset+ 20 > count) {
                links = {
                    first: retUrl,
                    last: retUrl + "&offset=" + (count - 20),
                    prev: prev,
                    self: retUrl + "&offset=" + (offset)
                };
            }
            else {
                links = {
                    first: retUrl,
                    last: retUrl + "&offset=" + (count - 20),
                    prev: "",
                    next: retUrl + "&offset=" + (offset + 20),
                    self: retUrl + "&offset=" + (offset)
                };
            }
            

            if (offset != 'undefined' && offset != null && offset != 0) {
                links.prev = retUrl + "&offset=" + (offset - 20);
            }

            Category.find({ id: catid }, function (err, cats) {
                if (err) {
                    console.log(err);
                } else {


                    var catname = cats[0].category;

                    Products.find({ category: catname }, function (err, prods) {
                        if (err) {
                            console.log(err);
                        } else {

                            var records = [];

                            for (var i = 0; i < prods.length; i++) {


                                var obj = {
                                    id: prods[i].prodid,
                                    remote_id: prods[i].prodid,
                                    url: prods[i].link,
                                    name: prods[i].name,
                                    price: prods[i].price,
                                    price_formatted: "₹" + prods[i].price,
                                    category: catid,
                                    brand: "",
                                    discount_price: prods[i].discountPrice,
                                    discount_price_formatted: "₹" + prods[i].discountPrice,
                                    currency: "₹",
                                    code: prods[i].sku,
                                    description: prods[i].description,
                                    main_image: prods[i].image,
                                    main_image_high_res: prods[i].image,
                                    images: [],
                                    variants: []
                                };

                                records.push(obj);
                            }

                            retObj = {
                                "metadata": {
                                    "links": links,
                                    "filters": [
                                        {
                                            "id": 3,
                                            "name": "Price",
                                            "label": "price",
                                            "type": "range",
                                            "values": [
                                                1,
                                                10899,
                                                "₹"
                                            ]
                                        }
                                    ],
                                    "sorting": "newest",
                                    "records_count": count
                                },
                                "records": records
                            };

                            res.json(retObj);

                        }
                    }).skip(0).limit(20);
                }
            });

        }
    });



});

router.get('/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var include = req.query.include

    var retObj = {}

    Products.findOne({ prodid: req.params.id }, function (err, prod) {
        if (err) {
            console.log(err);
        } else {

            if (prod == 'undefined' || prod == null) {
                res.json({});
                return;
            }

            retObj = {
                id: prod.prodid,
                remote_id: prod.prodid,
                url: prod.link,
                name: prod.name,
                price: prod.price,
                price_formatted: "₹" + prod.price,
                category: prod.catid,
                brand: "",
                discount_price: prod.discountPrice,
                discount_price_formatted: "₹" + prod.discountPrice,
                currency: "₹",
                code: prod.sku,
                description: prod.description,
                main_image: prod.image,
                main_image_high_res: prod.image,
                images: [],
                variants: prod.variants,
                related: []
            };
            res.json(retObj);
        }
    });
});


module.exports = router;
