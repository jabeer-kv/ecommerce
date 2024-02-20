const product = require('../models/productschema');
const users = require('../models/userschema');
const cart = require('../models/cartschema')
module.exports = {
  // cartadd: async (data) => {
  //   return product
  // },
  addcart: async (data, userid) => {
 
    const products = await product.findOne(data);
    const user = await users.findOne({ _id: userid });

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
    const pro = await cart.findOne({ _id: productid })
    return pro
  },
  finding: async (data) => {
    const prod = await cart.findOne({ _id: data }).lean()
    return prod
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
    const user = await cart.findOne({ user: userid });
    const produc = data.product;
    const quantity = data.quantity;
    const price = data.totalprice;
    const result = await cart.findOneAndUpdate(
      { user: userid, "items.product": product },
      { $set: { "items.$.quantity": quantity, "items.$.price": price } },
      { new: true }
    );
    return result;
  },
  cartpush: async (data, userid) => {
    async (userid, proid, cartItem) => {
      var price = await product.finddata(proid);
  
      var totprice = cartItem.quantity * price.price;
      value = {
        user: userid,
        items: [cartItem],
        totalPrice: totprice,
      }
  }
  await cart.insertMany(value);
},}
