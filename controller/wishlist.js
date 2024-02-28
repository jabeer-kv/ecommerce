const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Uhelper = require("../models/userschema");


module.exports = {
    wishlist:async (req,res)=>{
       
        res.render('users/wishlist')
        
    }
}