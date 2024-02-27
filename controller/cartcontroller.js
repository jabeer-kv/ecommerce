const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Uhelper = require("../models/userschema");

module.exports = {
  addtocart: async (req, res) => {
    try {
      const productid = req.params.id;
      const userid = req.session.userId;
      console.log(userid,productid);
      const product = await Phelper.findproductbyid(productid);
      if (!userid) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      const cartItem = {
        productid: productid,
        quantity: 1,
        product: product,
      };
      // ...
// const totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
// ...
      console.log('Cart Items:', cartItem);
      // console.log(tota);

      await Chelper.cartpush(cartItem, userid);

      res.redirect("/cart");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  cartpage: async (req, res) => {
    try {
      const userId = req.session.userId;
      const cart = await Chelper.getCart(userId);
      const users = req.session.loggedIn
      const totalPrice = await Chelper.calculateTotalPrice(cart);

      res.render('users/cart', { cart, users,totalPrice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  removeItem: async (req, res) => {
    try {
      const userId = req.session.userId;
      const productId = req.params.id;
      console.log(userId,productId);
  
      // Call the helper function to remove the item from the cart
      await Chelper.removeItem(userId, productId);
  
      // Redirect or send a response as needed
      res.redirect('/cart'); // Redirect to the cart page, adjust the URL as needed
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  
}
