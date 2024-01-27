var product=require("../models/productschema")
var phelper=require("../helpers/producthelper")
const path=require("path")
module.exports={
    adminpage:(req, res) => {
        res.render('admin/admin');
    },
    productpage:(req, res) => {
        console.log('hello');
        res.render('admin/productadding');
    },
    productadd:async (req, res) => {
        console.log(req.body)
        // const image=req.body.image
        // const Image=image=path.basename(req.file.filename)
        var products={
            name:req.body.name,
            category:req.body.category,
            quantity:req.body.avilablequantity,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image
        }
        console.log(products)
        await phelper.productinsert(products)
        res.redirect("/admin")
        
       
        
    }
}