var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    category: String,
    id: Number
});

postSchema.path('category').required(true, 'Cannot be empty');

mongoose.model('Category', postSchema, 'Categories');