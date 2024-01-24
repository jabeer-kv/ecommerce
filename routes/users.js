var express = require('express');
var router = express.Router();

var {signup,signin,userpage,signupdetail,logindata,logout,cart}= require('../controller/usercontroller')


router.get('/signup',signup)
router.post('/login',logindata)
router.get('/signin',signin)
router.post('/signupdata',signupdetail)
router.get('/home',userpage)
router.get('/logout',logout)
router.get('/cart',cart)



module.exports = router;
