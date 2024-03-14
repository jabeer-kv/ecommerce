var express = require('express');
var router = express.Router();


var {signup,signin,userpage,signupdetail,logindata,logout,edit,updateuser}= require('../controller/usercontroller')
var {checkout,checkoutdata}=require("../controller/checkout")
var {cartpage,addtocart,removeItem,decreaseCartItem,increaseCartItem}=require('../controller/cartcontroller')
var {wishlist,addtowishlist,removeformwish}=require('../controller/wishlist')
var isAuth=require("../middleware/isAuth")
var {payment}=require('../controller/paymentcontroller')

router.get('/signup',signup)
router.post('/login',logindata)
router.get('/signin',signin)
router.post('/signupdata',signupdetail)
router.get('/',userpage,isAuth)
router.get('/logout',logout)
router.get('/cart',cartpage,isAuth)
router.get('/addpro/:id',addtocart)
router.get('/checkout',checkout,isAuth)
router.get("/edit",edit)
router.post("/updateuser",updateuser)
router.get('/removeItem/:id',removeItem);
router.get('/wishlist',wishlist,isAuth)
router.get("/addtowishlist/:id",addtowishlist)
router.get('/removewish/:id',removeformwish)
router.post("/checkoutdata",checkoutdata)
router.post('/cart/increase/:productid',increaseCartItem);
router.post('/cart/decrease/:productid',decreaseCartItem);
router.post("/payment",payment);






module.exports = router;
