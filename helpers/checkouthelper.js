const user=require("../models/userschema")
const checkout=require("../models/checkoutschema")

module.exports={
    finduser:async (data)=>{
        const users=await user.findOne({_id:data})
        return users
    },
    update: async (data,users)=>{
        
    }

}