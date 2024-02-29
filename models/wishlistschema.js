// models/WishlistItem.js
const mongoose = require('mongoose');

const WishlistItemSchema = new mongoose.Schema({
 owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  items:[
    {
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products', // Assuming you have a Product model
            required: true,
        }
    }
  ]
 
});

module.exports = mongoose.model('WishlistItem', WishlistItemSchema);
