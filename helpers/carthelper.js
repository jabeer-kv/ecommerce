const Cart = require("../models/cartschema");
const User = require("../models/userschema");
const Product = require("../models/productschema");
const mongoose = require("mongoose");

module.exports = {
  addcart: async (userId, productId) => {
    const result = await Cart.findOne({ owner: new mongoose.Types.ObjectId(userId) });
    const product = await Product.findOne({ _id: productId });
    return { result, product };
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

     

        await userCart.save();
    } catch (error) {
      console.error(error);
      throw new Error("Error adding item to cart");
    }
  },




  calculateTotalPrice: async (cart) => {
    try {
      let totalPrice = 0;

      cart.items.forEach(item => {
        totalPrice += item.quantity * item.product.price;
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
        const existingItemIndex = userCart.items.findIndex(item => item && item.product && item.product.toString() === productId);

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
 
  removeProductFromCart: async (userId, productId) => {
    try {
      let userCart = await Cart.findOne({ owner: new mongoose.Types.ObjectId(userId) });

      if (userCart && userCart.items && userCart.items.length > 0) {
        const updatedItems = userCart.items.filter(item => item.product.toString() !== productId);

        userCart.items = updatedItems;

        await userCart.save();

        return userCart;
      }

      return null; // Return null if the cart is empty or the product is not found
    } catch (error) {
      console.error(error);
      throw new Error("Error removing product from cart");
    }
  },
  updateCartItem: async (userId, productid, action) => {
    try {
      // Find the user's cart
      const userCart = await Cart.findOne({ owner: userId });
      // Find the cart item corresponding to the productid
      const cartItem = userCart.items.find(item => item.product == productid);
      if (cartItem) {
        // Update the cart based on the action
        if (action === 'increase') {
          // Increase quantity
          cartItem.quantity++;
        } 
        else if (action === 'decrease' && cartItem.quantity > 1) {
          // Decrease quantity, but ensure it doesn't go below 1
          cartItem.quantity --;
        
      }

      // Save the updated cart
      await userCart.save();
    }

      // Return the updated cart
      return userCart
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },






}