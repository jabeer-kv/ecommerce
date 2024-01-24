const user=require('../models/userschema')
module.exports={
    datainsert: async (data)=>{
        console.log(data)
        var ans=await user.insertMany(data)
        console.log(ans)
        return ans
    },
    finding: async (data)=>{
        console.log(data)
        var ans=await user.findOne(data)
        return data
        
    }
}