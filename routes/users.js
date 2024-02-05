var express = require('express');
var router = express.Router();


var {signup,signin,userpage,signupdetail,logindata,logout,cartpage}= require('../controller/usercontroller')


router.get('/signup',signup)
router.post('/login',logindata)
router.get('/signin',signin)
router.post('/signupdata',signupdetail)
router.get('/',userpage)
router.get('/logout',logout)
router.get('/cart',cartpage)






module.exports = router;
