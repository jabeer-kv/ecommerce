
const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Uhelper = require("../models/userschema");
const Cart=require("../models/cartschema")
const Product=require("../models/productschema");

module.exports = {
  checkout: async (req, res) => {
    try {
        const users = req.session.loggedIn
      const userId = req.session.userId;
      const cart = await Chelper.getCart(userId);
        console.log(userId);
   
        console.log(cart);
      const totalPrice = Chelper.calculatetotalPrice(cart.items);

      await Chelper.clearCart(userId);

      res.render('users/checkout', { cart,total: totalPrice,users});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing checkout' });
    }
  },
};
