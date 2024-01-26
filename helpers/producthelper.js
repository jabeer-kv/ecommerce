const product = require('../models/product');
module.exports = {
    productinsert: async (data)=>{
        console.log(data)
        var ans=await user.insertMany(data)
        console.log(ans)
        return ans
    }

    
    
}