
const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Uhelper = require("../models/userschema");
const Product = require("../models/productschema");
const Checkout = require("../helpers/checkouthelper")
const coupon=require("../helpers/couponhelper");
const razorpay = require("../config/razorpay")
const crypto = require("crypto");

module.exports = {
  checkout: async (req, res) => {
    try {
      const users = req.session.loggedIn
      const userId = req.session.userId;
      const cart = await Chelper.getCart(userId);

      const totalPrice = Checkout.calculatetotalPrice(cart.items);

     
      const coupons = await coupon.findcoupon()
     

      res.render('users/checkout', { cart, totalPrice,coupon:coupons,users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing checkout' });
    }
  },
  checkoutdata: async (req, res) => {
    console.log("hello")
    const users = req.session.userId
    const user = await Checkout.finduser(users)
    const timestamp = Date.now()
    const Cart = await Checkout.getCart(users)
    const totalPrice = Checkout.calculatetotalPrice(Cart.items);
    const randomNum = Math.floor(Math.random() * 1000);
    const orderid = `ORD-${timestamp}-${randomNum}`;

    console.log(totalPrice)

    const data = {
      userId: users,
      orderId: orderid,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      landmark: req.body.landmark,
      pincode: req.body.pincode,
      address: req.body.address,
      city: req.body.city,
      orderdate: new Date(),
      cart: Cart.items,
      price: totalPrice,
      status: "pending",


    }
    console.log(data);
    var order = await razorpay.payment(totalPrice, orderid);
    await Checkout.update(data)
    res.json(order)
  },
  verifypayment: async (req, res) => {
    const userid = req.session.userId;
    const paymentId = req.body["payment[razorpay_payment_id]"];
    const orderId = req.body["payment[razorpay_order_id]"];
    const signature = req.body["payment[razorpay_signature]"];
    const orderID = req.body.orderID;
    console.log(paymentId, orderID)
    //algorithm for checking the payid+orderid=signature
    const hash = crypto.createHmac("sha256", process.env.KEY_SECRET);
    hash.update(orderId + "|" + paymentId);
    const digest = hash.digest("hex");

    if (digest === signature) {
      console.log("payment successful");
      Checkout.updatestatus(orderID, paymentId);
      await Chelper.clearCart(userid);
      res.json("success");
    }
    else {
      res.json("failed")
    }
  },
  success: (req, res) => {
    res.render("users/success");
  },
};
