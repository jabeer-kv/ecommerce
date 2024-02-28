const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
    ,
    product:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            }
  
        ]



})
const wishlist = mongoose.model('Users', wishlistSchema)
module.exports = wishlist