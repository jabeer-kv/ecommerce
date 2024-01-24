var express = require('express');
var router = express.Router();
var {adminpage,productadd}=require('../controller/admincontroller')

/* GET home page. */
router.get('/', adminpage);
router.get('/add', productadd);


module.exports = router;