const product = require('../models/productschema');
const users= require('../models/userschema');
const cart=require('../models/cartschema')
module.exports={
    cartadd:async(data)=>{
        var product= await product.findOne(data)
        return product
    },
    _addcart: async (data, userid) => {
        const user = await user.findOne({ _id: userid });
        ProductID = data.productId;
        quantiy = data.quantiy;
        price = data.totalprice;
    },
    getitemscart: async (data) => {
        const result = await cart
          .findOne({ user: data })
          .populate("items.product")
          .lean();
        return result;
    }
}