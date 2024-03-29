const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Uhelper = require("../models/userschema");
const Cart = require("../models/cartschema");

module.exports = {
  addtocart: async (req, res) => {
    try {
      const productid = req.params.id;
      const userId = req.session.userId;
      const product = await Phelper.findproductbyid(productid);
      if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const cartItem = {
        productid, // Convert productid to ObjectId
        quantity: 1,
        product,
      };
     let userCart = await Cart.findOne({ owner: userId });

      if (!userCart) {
        userCart = new Cart({ owner: userId, items: [cartItem] });
        await userCart.save();
      } else {
        const existingItem = userCart.items.find(
          (item) => item.productid && item.productid.equals(cartItem.productid)
        );

        if (existingItem) {
          // If the product already exists, redirect to cart page or send a message
          return res.redirect("/cart"); // Assuming you have a route for displaying the cart
        }  else {
          // If the product does not exist, add it to the cart
          userCart.items.push(cartItem);
        }

        await userCart.save();
      }

      // // Calculate and save the total price
      // const totalPrice = await Chelper.calculateTotalPrice(userCart);
      // userCart.totalPrice = totalPrice;
      // console.log(userCart.totalPrice);
      // await userCart.save();

      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  cartpage: async (req, res) => {
    try {
      const userId = req.session.userId;
      const cart = await Chelper.getCart(userId);
      const users = req.session.loggedIn;
      const totalPrice = await Chelper.calculateTotalPrice(cart);

      res.render("users/cart", { cart, users, totalPrice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  removeItem: async (req, res) => {
    try {
      const userId = req.session.userId;
      const productId = req.params.id;
      await Chelper. removeProductFromCart(userId, productId);

      res.redirect("/cart");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
 
  increaseCartItem: async (req, res) => {
    try {
      const userId = req.session.userId;
      const productid = req.params.productid;
      console.log({userId, productid});
      // Update cart using helper method
      const updatedCart = await Chelper.updateCartItem(userId, productid, 'increase');

      
      res.json(updatedCart);
    } catch (error) {
      console.error('Error increasing cart item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  decreaseCartItem: async (req, res) => {
    try {
      const userId = req.session.userId;
      const productid = req.params.productid;

      // Update cart using helper method
      const updatedCart = await Chelper.updateCartItem(userId, productid, 'decrease');
      console.log("ITEm",updatedCart);
      // Send updated cart as JSON response
      res.json(updatedCart);
    } catch (error) {
      console.error('Error decreasing cart item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};