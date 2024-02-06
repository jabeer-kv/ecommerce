const product = require('../models/productschema');
const users= require('../models/userschema');
const cart=require('../models/cartschema')
module.exports={
    cartadd:async(data)=>{
        var product= await product.findOne(data)
        return product
    },
    addcart: async (data, userid) => {
        const user = await user.findOne({ _id: userid });
        product = data.productId;
        quantiy = data.quantiy;
        price = data.totalprice;
    },
    cartcount: async (data) => {
        const result = await cart.findOne({ user: data })
          if (result){
            const count = result.items.length
            return count
          }
          else{
            return 0
          }
       
        
    }
}