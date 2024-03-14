const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
  orderdate:{
    type:Date,
    default:()=> new Date().toLocaleString("en-US",{timezone:"UTC"})
  },
  cart:[
    {
      productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity:{
        type: Number,
        required: true,
        
      },
      price:{
        type: Number,
        required: true,
      }
    }
  ],
  
  
  

  
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
