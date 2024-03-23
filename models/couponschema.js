const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponName:{
        type:String,
        requierd:true
    },
    couponCode:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    }

})

const Coupon = mongoose.model("coupons", couponSchema);
module.exports = Coupon;