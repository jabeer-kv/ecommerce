const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponname:string,
    couponcode:{
        type:string,
        required:true
    },
    amount:{
        type:number,
        required:true
    },
    startdate:{
        type:string,
        required:true
    },
    expairydate:{
        type:string,
        required:true
    }

})

const Coupon = mongoose.model("coupons", couponSchema);

module.exports = Coupon;