const user=require("../models/userschema")
const checkout=require("../models/checkoutschema")

module.exports={
    finduser:async (data)=>{
        const users=await user.findOne({_id:data})
        console.log(users)
        return users
    },
    update: async (data)=>{
        const insert=await checkout.insertMany(data)
        console.log(insert);
        return insert
    },
    calculatetotalPrice: (items) => {
        return items.reduce((total, item) => 50 + total + (item.product.price * item.quantity), 0);
      },

}