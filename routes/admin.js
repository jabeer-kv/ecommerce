var express = require('express');
var router = express.Router();
var {adminpage,productadd,productpage,userspage,deleteproduct,Productpage,editpage,updateproduct,logout}=require('../controller/admincontroller')
var {coupon,addcoupon,deletecoupon}=require("../controller/coupon")
const Upload=require('../middleware/multer')

/* GET home page. */
router.get('/', adminpage);
router.get('/product', productpage);
router.post('/add',Upload.single('image'),productadd);
router.get('/users',userspage)
router.post('/delete',deleteproduct)
router.get('/products',Productpage)
router.get('/edit/:id',editpage)
router.post('/update/:id',Upload.single('image'),updateproduct)
router.get('/logout',logout)
router.get("/coupon",coupon)
router.post("/addcoupon",addcoupon)


module.exports = router;