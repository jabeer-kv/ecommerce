var express = require('express');
var router = express.Router();
var {adminpage,productadd,productpage,userspage}=require('../controller/admincontroller')
const Upload=require('../middleware/multer')

/* GET home page. */
router.get('/', adminpage);
router.get('/product', productpage);
router.post('/add',Upload.single('image'),productadd);
router.get('/users',userspage)


module.exports = router;