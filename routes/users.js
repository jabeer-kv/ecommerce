var express = require('express');
var router = express.Router();


var {signup,signin,userpage,signupdetail,logindata,logout,edit,updateuser}= require('../controller/usercontroller')
var {checkout,checkoutdata}=require("../controller/checkout")
var {cartpage,addtocart,removeItem}=require('../controller/cartcontroller')
var {wishlist,addtowishlist}=require('../controller/wishlist')

router.get('/signup',signup)
router.post('/login',logindata)
router.get('/signin',signin)
router.post('/signupdata',signupdetail)
router.get('/',userpage)
router.get('/logout',logout)
router.get('/cart',cartpage)
router.get('/addpro/:id',addtocart)
router.get('/checkout',checkout)
router.get("/edit",edit)
router.post("/updateuser",updateuser)
router.get('/removeItem/:id',removeItem);
router.get('/wishlist',wishlist)
router.get("/addtowishlist/:id",addtowishlist)
router.post("/checkoutdata",checkoutdata)






module.exports = router;
