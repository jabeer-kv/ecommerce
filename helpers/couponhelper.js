const coupon=require("../models/couponschema")
module.exports={
    add: async (data)=>{
        console.log(data)
        var ans=await coupon.insertMany(data)
        return ans
    },
    checking: async (data)=>{
        var ans=await coupon.findOne({couponcode:data}).lean()
        return ans
    },
    findcoupon: async()=>{
        var ans=await coupon.find().lean()
        return ans
    }
    
}