const user=require('../models/userschema')
module.exports={
    datainsert: async (data)=>{
       
        var ans=await user.insertMany(data)
       
        return ans
    },
    finding: async (data)=>{
        console.log(data);
        var ans=await user.findOne({email:data}).lean()
        // console.log(ans)
        
        return ans
        
    },
    calculatetotalPrice: (items) => {
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
    finduser:async(data)=>{
        const ans = await user.findOne({ _id:data }).lean();
        return ans
    },
    updateuser:async(data,userid)=>{
        console.log(userid);
        const ans = await user.findOneAndUpdate({_id:userid},{
            $set:{
                name:data.name,
                email:data.email,
                username:data.username
            }
        })
        console.log(ans)
        return ans
    }
}