var express = require('express');
var router = express.Router();


var {signup,signin,userpage,signupdetail,logindata,logout}= require('../controller/usercontroller')
var {cartpage,addtocart}=require('../controller/cartcontroller')

router.get('/signup',signup)
router.post('/login',logindata)
router.get('/signin',signin)
router.post('/signupdata',signupdetail)
router.get('/',userpage)
router.get('/logout',logout)
router.get('/cart',cartpage)
router.get('/addpro',addtocart)






module.exports = router;
