var express = require('express');
var router = express.Router();
var {adminpage}=require('../controller/admincontroller')

/* GET home page. */
router.get('/', adminpage);
module.exports = router;