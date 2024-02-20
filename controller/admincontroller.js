var product = require("../models/productschema")
var phelper = require("../helpers/producthelper")
var ahelper = require("../helpers/adminhelper")
const path = require("path")
const { error } = require("console")
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
    userspage: async (req, res) => {
        const user = await ahelper.showusers()

        res.render('admin/users', { user })
    },
    deleteproduct: async (req, res) => {
        const id=req.params.id
        console.log("sdsfdsgs",id)
        const deleted = await phelper.deleting(id)
        console.log("product deleted");
        res.redirect("/admin/products")
    },
    Productpage: async (req, res) => {
        const product = await phelper.showproduct()
        console.log(product[0].image)
        res.render('admin/showproduct', { product })
    },
    editpage: async (req, res) => {
        const Productid = req.params.id
        console.log(Productid);
        const data = await phelper.findproductbyid(Productid)
        res.render('admin/productedit', { data: data })
    },
    updateproduct: async (req, res) => {
        const productId = req.params.id
        const product = await phelper.findproductbyid(productId)
        console.log(req.body)
        image=product.image
        const imagepath='../public/uploads'+image
        const data = { 
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            description: req.body.description,
            price: req.body.price,
            image:req.file.filename
            
        }
        console.log("f",data)
        await phelper.update(productId, data)
        res.redirect("/admin/products")
    },
    logout: (req, res) => {
        req.session.destroy()
        res.render("users/signin");
    },


}
