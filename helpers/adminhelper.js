const product = require('../models/productschema');
const users= require('../models/userschema');
module.exports={
    showusers: async (data)=>{
        var ans=await users.find({role:'user'}).lean()
        console.log(ans)
        return ans
    }
    
}
