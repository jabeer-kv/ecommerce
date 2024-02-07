var express = require('express');
var router = express.Router();
var {adminpage,productadd,productpage,userspage,deleteproduct}=require('../controller/admincontroller')
const Upload=require('../middleware/multer')

/* GET home page. */
router.get('/', adminpage);
router.get('/product', productpage);
router.post('/add',Upload.single('image'),productadd);
router.get('/users',userspage)
router.post('/delete',deleteproduct)


module.exports = router;