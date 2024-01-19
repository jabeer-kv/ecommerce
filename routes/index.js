var express = require('express');
var router = express.Router();

var {signup,signin,userpage}= require('../controller/usercontroller')


router.get('/signup',signup)
router.get('/signin',signin)
router.get('/user',userpage)
module.exports = router;
