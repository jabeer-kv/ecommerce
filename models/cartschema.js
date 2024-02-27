const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
      totalprice: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
