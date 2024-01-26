var product=require("../models/productschema")
// var phelper=require("../helpers/producthelper")
module.exports={
    adminpage:(req, res) => {
        res.render('admin/admin');
    },
    productpage:(req, res) => {
        res.render('admin/productadding');
    },
    productadd:async (req, res) => {
        var products={
            name:req.body.name,
            category:req.body.category,
            quantity:req.body.avilablequantity,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image,
            
        }
        console.log(products)
        await product.insertMany(products)
       
        
    }
}