var express = require('express');
var router = express.Router();

var {signup,signin,userpage,signupdata}= require('../controller/usercontroller')


router.get('/signup',signup)
router.get('/signin',signin)
router.get('/home',userpage)
router.post('/signup',signupdata)



module.exports = router;
