const user=require('../models/userschema')
module.exports={
    datainsert: async (data)=>{
       
        var ans=await user.insertMany(data)
       
        return ans
    },
    finding: async (data)=>{
        
        var ans=await user.findOne({email:data}).lean()
        console.log(ans)
        
        return ans
        
    }
}