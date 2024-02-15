const user = require("../models/userschema");
const prodata = require("../models/productschema")
const uhelper = require("../helpers/userhelper");
const phelper = require("../helpers/producthelper")


module.exports = {
    checkout:async (req,res)=>{
        const users = req.session.loggedIn
        res.render('users/checkout',{users})
        
    }
}