const user=require('../models/userschema')
module.exports={
    datainsert: async (data)=>{
        var ans=await user.insertMany(data)
    }
}