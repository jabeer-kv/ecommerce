var express = require('express');
var router = express.Router();
var {adminpage,productadd,productpage}=require('../controller/admincontroller')

/* GET home page. */
router.get('/', adminpage);
router.get('/product', productpage);
router.post('/add', productadd);


module.exports = router;