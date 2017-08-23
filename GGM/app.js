'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


var app = express();
module.exports = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function () { console.log('Mongoose default connection open'); });
db.on('disconnected', function () { console.log('Mongoose default connection disconnected'); });
db.once('open', function () {
    // we're connected!
});


process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

require('./models/categories')
//require('./models/sizes')
//require('./models/colors')
require('./models/products')
require('./models/logins')


var routes = require('./routes/index');
var users = require('./routes/users');
var navigation = require('./routes/navigation');
var banners = require('./routes/banners');
var products = require('./routes/products');
var logins = require('./routes/logins');
var shops = require('./routes/shops');


app.use('/', routes);
app.use('/users', users);
app.use('/21/navigation_drawer', navigation);
app.use('/21/banners', banners);
app.use('/21/products', products);
app.use('/21/login/email', logins);
app.use('/4/shops', shops);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), "0.0.0.0", function () {
    debug('Express server listening on port ' + server.address().port);
    mongoose.connect('mongodb://ggmmongo:EmOl40L6wXsCRwUWzGMoWuLJ3vXZlD6iSSlnq4vkMcoxVALJlrHlHCTRSiLsMaQirqYo3hxTAuXi0Ulc6PF73g==@ggmmongo.documents.azure.com:10255/?ssl=true&replicaSet=globaldb');
});



//var Category = mongoose.model('Category');
//Category.find({}, 'category', function (err, cats) {
//    if (err) {
//        console.log(err);
//    } else {
//        //res.render('navigation', cats);
//        console.log('retrieved list of categories', cats.length, cats[0].category);
//    }
//})