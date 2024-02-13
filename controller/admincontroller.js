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
        const deleted = await phelper.delete({ _id: req.body.delete })
        res.send(deleted)
    },
    Productpage: async (req, res) => {
        const product = await phelper.showproduct()
        res.render('admin/showproduct', { product })
    },
    editpage: async (req, res) => {
        const Productid = req.params.id
        console.log(Productid);
        const data = await phelper.findproductbyid(Productid)
        console.log("hhuygyyfr")
        res.render('admin/productedit', { data: data })
    },
    updateproduct: async (req, res) => {
        const productId = req.params.id
        const product = await phelper.findproductbyid(productId)
        console.log(product);
        const data = {
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            description: req.body.description,
            price: req.body.price,

        }
        await phelper.update(productId, data)
        res.render("admin/showproduct")
    },
    logout: (req, res) => {
        req.session.destroy()
        res.render("users/signin");
    },


}
