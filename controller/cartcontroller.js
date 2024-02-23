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
      console.log('Cart Items:', cartItem);

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
      const productid = req.params.id;
     console.log(userId);
      const cart = await Chelper.addcart(userId, productid);

      const count = await Chelper.cartcount(cart);

      const users = req.session.loggedIn;
      // console.log('Cart:', cart);

      if (cart && cart.items) {
        // Assuming cart.items is an array of items in the cart
        const total = cart.items.reduce((total, item) => total + (item.totalprice || 0), 0);
        res.render('users/cart', { users, cart, total });
      } else {
        res.render('users/cart', { users });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};
