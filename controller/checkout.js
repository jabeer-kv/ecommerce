
const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Uhelper = require("../models/userschema");
const Product=require("../models/productschema");
const Checkout=require("../helpers/checkouthelper")
const razorpay=require("../config/razorpay")
const crypto = require("crypto");

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
    const totalPrice = Checkout.calculatetotalPrice(Cart.items);
    const randomNum = Math.floor(Math.random() * 1000);
    const orderid = `ORD-${timestamp}-${randomNum}`;
    
    console.log(totalPrice)
   
    const data={
      userId:users,
      orderId:orderid,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      phone:req.body.phone,
      email:req.body.email,
      landmark:req.body.landmark,
      pincode:req.body.pincode,
      address:req.body.address,
      city:req.body.city,
      orderdate: new Date(),
      cart: Cart.items,
      price:totalPrice,
      status: "pending",

      
    }
    console.log(data);
    var order = await razorpay.payment(orderid,totalPrice);
    await Checkout.update(data)
    res.redirect("/");
  },
  verifypayment: async (req,res)=>{
    const userId=req.session.userId
    const paymentId=req.body["payment[razorpay_payment_id]"]
    const orderId=req.body["order[razorpay_order_id]"]
    const signature=req.body["payment[razorpay_signature]"]
   
  }
};
