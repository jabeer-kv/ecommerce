const product = require('../models/productschema');
module.exports = {
    productinsert: async (data)=>{
        // console.log(data)
        var ans=await product.insertMany(data)
        console.log(ans)
        return ans
    },
    showpro: async (data)=>{
        var ans=await product.find().lean()
        console.log(ans)
        return ans
    },
    

    
    
}