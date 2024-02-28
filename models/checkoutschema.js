const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  keepMeUpdated: {
    type: Boolean,
    default: false,
  },
  saveAddress: {
    type: Boolean,
    default: false,
  },
  
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
