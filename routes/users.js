var express = require('express');
var router = express.Router();


var {signup,signin,userpage,signupdetail,logindata,logout}= require('../controller/usercontroller')


router.get('/signup',signup)
router.post('/login',logindata)
router.get('/',signin)
router.post('/signupdata',signupdetail)
router.get('/home',userpage)
router.get('/logout',logout)






module.exports = router;
