
const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Uhelper = require("../models/userschema");
const Product=require("../models/productschema");
const Checkout=require("../helpers/checkouthelper")

module.exports = {
  checkout: async (req, res) => {
    try {
        const users = req.session.loggedIn
      const userId = req.session.userId;
      const cart = await Chelper.getCart(userId);
       
      const totalPrice = Checkout.calculatetotalPrice(cart.items);

      await Chelper.clearCart(userId);

      res.render('users/checkout', { cart,totalPrice,users});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing checkout' });
    }
  },
  checkoutdata: async (req,res)=>{
    const users=req.session.userId
    const user=await Checkout.finduser(users)
    const Cart=await Checkout.getCart(users)
    console.log(Cart);
   
    const data={
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      phone:req.body.phone,
      email:req.body.email,
      landmark:req.body.landmark,
      pincode:req.body.pincode,
      address:req.body.address,
      city:req.body.city,
      orderdate: new Date(),
      // cart: Cart.items,
      // price:Cart.items[0].totalprice

      
    }
    console.log(data);
    await Checkout.update(data)
    res.redirect("/");
  }
};
