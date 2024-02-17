const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    product:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
  
        ]



})
const wishlist = mongoose.model('Users', wishlistSchema)
module.exports = wishlist