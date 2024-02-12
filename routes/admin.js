var express = require('express');
var router = express.Router();
var {adminpage,productadd,productpage,userspage,deleteproduct,Productpage,editpage,updateproduct}=require('../controller/admincontroller')
const Upload=require('../middleware/multer')

/* GET home page. */
router.get('/', adminpage);
router.get('/product', productpage);
router.post('/add',Upload.single('image'),productadd);
router.get('/users',userspage)
router.post('/delete',deleteproduct)
router.get('/products',Productpage)
router.get('/edit/:id',editpage)
router.post('/update/:id',updateproduct)


module.exports = router;