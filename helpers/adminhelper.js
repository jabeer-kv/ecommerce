const product = require('../models/productschema');
const users= require('../models/userschema');
const cart=require('../models/cartschema')
module.exports={
    showusers: async (data)=>{
        var ans=await users.find({role:'user'}).lean()
        console.log(ans)
        return ans
    },
    deleted: async (data)=>{
            const dele= await product.findOneAndDelete(data)
         return dele
    },
    showproduct: async (data)=>{
            const show= await product.find(data)
            return show
    },
   
    
}
