const product = require('../models/productschema');
module.exports = {
    productinsert: async (data)=>{
        // console.log(data)
        var ans=await product.insertMany(data)
        console.log(ans)
        return ans
    }

    
    
}