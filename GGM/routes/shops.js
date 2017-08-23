'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        "metadata": null,
        "records": [
            {
                "id": 21,
                "name": "English",
                "description": "",
                "url": "",
                "logo": "",
                "google_ua": "",
                "language": "en",
                "currency": "USD",
                "flag_icon": "http:\/\/77.93.198.186\/images\/flags\/48\/us.png"
            }]
    });

});

module.exports = router;
