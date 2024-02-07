var product = require("../models/productschema")
var phelper = require("../helpers/producthelper")
var ahelper=require("../helpers/adminhelper")
const path = require("path")
module.exports = {
    adminpage: (req, res) => {
        res.render('admin/admin');
    },
    productpage: (req, res) => {
        console.log('hello');
        res.render('admin/productadding');
    },
    productadd: async (req, res) => {
        console.log(req.body)
        const image = req.body.image


        const Image = req.body.image = path.basename(req.file.filename)

        var products = {
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            description: req.body.description,
            price: req.body.price,
            image: Image
        }

        console.log(products.quantity)


        await phelper.productinsert(products)
        res.redirect("/admin")



    },
    userspage:async (req,res)=>{
       const user=await ahelper.showusers()
       
        res.render('admin/users',{user})
    },
    deleteproduct: async (req, res) => {
        const deleted = await phelper.delete({ _id: req.body.delete })
        res.send(deleted)
      },
    productpage:async (req, res) => {
        const product=await ahelper.showproduct()
        res.render('admin/showproduct', {product})
    }
    
}