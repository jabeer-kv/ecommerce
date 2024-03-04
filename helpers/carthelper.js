const Cart = require("../models/cartschema");
const User = require("../models/userschema");
const Product = require("../models/productschema");
const mongoose = require("mongoose");

module.exports = {
  addcart: async (userId, productId) => {
    const result = await Cart.findOne({ owner: new mongoose.Types.ObjectId(userId) });
    const product = await Product.findOne({ _id: productId });
    return {result, product };
  },

  cartcount: async (data) => {
    const result = await Cart.findOne({ owner: data });
    if (result) {
      const count = result.items.length;
      return count;
    } else {
      return 0;
    }
  },
  getCart: async (userId) => {
    try {
      const cart = await Cart.findOne({ owner: userId })
        .populate({
          path: 'items.product',
          model: 'Products', // Assuming your product model is named 'Products'
        })
        .lean();

      return cart || { items: [] };
    } catch (error) {
      throw new Error('Error getting cart');
    }
  },

  cartpush: async (cartItem, userId) => {
    try {
      let userCart = await Cart.findOne({ owner: userId });
  
      if (!userCart) {
        userCart = new Cart({ owner: userId, items: [cartItem] });
        await userCart.save();
      } else {
        const existingItem = userCart.items.find(item => item.productid && item.productid.toString() === cartItem.productid.toString());
  
        if (existingItem) {
          // If the product already exists, update the quantity
          existingItem.quantity += cartItem.quantity;
        } else {
          // If the product does not exist, add it to the cart
          userCart.items.push(cartItem);
        }
  
        await userCart.save();
      }
  
      // Calculate total price
      // let totalPrice = 0;
      // userCart.items.forEach(item => {
      //   totalPrice += item.quantity * item.price;
      // });
  
      // return totalPrice;
       // Return the total price
      //  console.log(totalPrice);
    } catch (error) {
      console.error(error);
      throw new Error("Error adding item to cart");
    }
  },
  calculateTotalPrice: async (cart) => {
    try {
      let totalPrice = 0;
  
      cart.items.forEach(item => {
        totalPrice = 50+ item.quantity  * item.product.price;
      });
  
      return totalPrice;
    } catch (error) {
      console.error(error);
      throw new Error("Error calculating total price");
    }
  },
 // carthelper.js
 removeItem: async (userId, productId) => {
  try {
    let userCart = await Cart.findOne({ owner: userId });

    if (userCart && userCart.items && userCart.items.length > 0) {
      const existingItemIndex = userCart.items.findIndex(item => item && item.productid && item.productid.toString() === productId);

      if (existingItemIndex !== -1) {
        // Decrease the quantity by 1
        userCart.items[existingItemIndex].quantity -= 1;

        // If quantity is 0, remove the item
        if (userCart.items[existingItemIndex].quantity <= 0) {
          userCart.items.splice(existingItemIndex, 1);
        }

        // Save the updated cart
        await userCart.save();
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error removing item from cart");
  }
},
 getCartByUserId: async (userId) => {
    try {
      const userCart = await Cart.findOne({ userid: userId });
      console.log(userCart);
      return userCart;
    } catch (error) {
      console.error("Error getting user cart", error);
      throw error;
    }
  },
  clearCart: async (userId) => {
    try {
      await Cart.findOneAndDelete({ userid: userId });
    } catch (error) {
      console.error("Error clearing user cart", error);
      throw error;
    }
  },
  calculatetotalPrice: (items) => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },
  deletepro:async (user,product) => {
    const cart =await Cart.findOne({owner: user})
    


  }



  

  
  
}