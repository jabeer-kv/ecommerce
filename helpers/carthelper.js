const product = require('../models/productschema');
const users = require('../models/userschema');
const cart = require('../models/cartschema')
module.exports = {
  cartadd: async (data) => {
    var product = await product.findOne(data)
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
    if (result) {
      const count = result.items.length
      return count
    }
    else {
      return 0
    }
  },
  existcart: async (data) => {
    const exist = await cart.find(data)
    return exist
  },
  proext: async (userid, productid) => {
    const product = await cart.findOne({ _id: productid })
    return product
  },
  finding: async (productid) => {
    const product = await cart.findOne({ _id: productid }).lean()
    return product
  },
  countitems: async (userid) => {
    const result = await cart.findOne({ user: userid });
    if (result) {
      const count = result.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      return count;
    } else return 0;
  },
  cartupdate: async (data, userid) => {
    const user = await user.findOne({ _id: userid });
    product = data.productId;
    quantiy = data.quantiy;
    price = data.totalprice;
    const result = await cart.findOneAndUpdate(
      { user: userid },
      { $set: { "items.$.quantiy": 2 } },
      { new: true }
    );
    return result;
  }

}