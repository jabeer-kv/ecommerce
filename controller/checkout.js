
const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Uhelper = require("../models/userschema");
const Cart=require("../models/cartschema")
const Product=require("../models/productschema");
const Checkout=require("../helpers/checkouthelper")

module.exports = {
  checkout: async (req, res) => {
    try {
        const users = req.session.loggedIn
      const userId = req.session.userId;
      const cart = await Chelper.getCart(userId);
       
      const totalPrice = Chelper.calculatetotalPrice(cart.items);

      await Chelper.clearCart(userId);

      res.render('users/checkout', { cart,total: totalPrice,users});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing checkout' });
    }
  },
  checkoutdata: async (req,res)=>{
    const users=req.session.userId
    const user=await Checkout.finduser(users)
    console.log(user);
    const data={
      name:req.body.name,
      email:req.body.email,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip:req.body.zip,
      phone:req.body.phone
    }
    console.log(data);
    await Checkout.update(data,users)
    res.redirect("/")
  }
};
