var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    email: String,
    pass: String,
    id: Number,
    remote_id: String,
    fb_id: Number,
    access_token: String,
    name: String,
    street: String,
    city: String,
    house_number: String,
    zip: String,
    phone: String,
    gender: String
});

postSchema.path('email').required(true, 'Cannot be empty');

mongoose.model('Login', postSchema, 'Logins');