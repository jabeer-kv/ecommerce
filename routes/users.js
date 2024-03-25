var express = require('express');
var router = express.Router();


var {signup,signin,userpage,signupdetail,logindata,logout,edit,updateuser,search,view,showproduct,fruits,veg,drinks}= require('../controller/usercontroller')
var {checkout,checkoutdata,verifypayment,success}=require("../controller/checkout")
var {cartpage,addtocart,removeItem,decreaseCartItem,increaseCartItem}=require('../controller/cartcontroller')
var {wishlist,addtowishlist,removeformwish}=require('../controller/wishlist')
var isAuth=require("../middleware/isAuth")

router.get('/signup',signup)
router.post('/login',logindata)
router.get('/signin',signin)
router.post('/signupdata',signupdetail)
router.get('/',userpage,isAuth)
router.get('/logout',logout)
router.get('/cart',isAuth,cartpage)
router.get('/addpro/:id',addtocart)
router.get('/checkout',isAuth,checkout)
router.get("/edit",edit)
router.post("/updateuser",updateuser)
router.get('/removeItem/:id',removeItem);
router.get('/wishlist',isAuth,wishlist)
router.get("/addtowishlist/:id",addtowishlist)
router.get('/removewish/:id',removeformwish)
router.post("/checkoutdata",checkoutdata)
router.post('/cart/increase/:productid',increaseCartItem);
router.post('/cart/decrease/:productid',decreaseCartItem);
router.post("/verifypayment",verifypayment)
router.get("/success",success)
router.post("/search",search)
router.get("/view",view)
router.get("/show/:id",showproduct)
router.get("/fruits",fruits)
router.get("/ veg",veg)
router.get("/drinks",drinks)






module.exports = router;
