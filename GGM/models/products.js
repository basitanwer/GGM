var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    name: String,
    size: String,
    discountPrice: Number,
    price: Number,
    shipping: String,
    description: String,
    link: String,
    sku: String,
    inventory: Number,
    color: String,
    category: String,
    prodid: Number,
    image: String,
    variants: [{
        id: Number,
        code: String,
        color: {
            id: Number,
            remote_id: Number,
            value: String,
            code: String,
            img: [String]
        },
        size: {
            id: Number,
            remote_id: Number,
            value: String
        }
    }]
});

postSchema.path('price').required(true, 'Cannot be empty');
postSchema.path('sku').required(true, 'Cannot be empty');
postSchema.path('discountPrice').required(true, 'Cannot be empty');
postSchema.path('link').required(true, 'Cannot be empty');
postSchema.path('category').required(true, 'Cannot be empty');

mongoose.model('Product', postSchema, 'Products');