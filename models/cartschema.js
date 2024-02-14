
// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//   products: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'products',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   }
// });

// const cartSchema = new mongoose.Schema({
//   userid: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'users'
//   },
//   products: [itemSchema],

//   totalPrice: {
//     type: Number,
//     required: true,
//     default: 0
//   }
// });

// module.exports = mongoose.model('carts', cartSchema);

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
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      totalprice:{
        type:Number,
        required:true,
        default:0
        
      }
    },
  ],
  
});

module.exports = mongoose.model('Cart', cartSchema);
