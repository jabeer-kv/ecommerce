const product = require('../models/productschema');
const users = require('../models/userschema');
const cart = require('../models/cartschema')
module.exports = {

    addcart: async (userid,data) => {
    // console.log(userid);
    const user = await users.findOne({_id:userid}).lean();
    const products = await product.findOne({_id:data});
    console.log(user,products);
    return {products,user}

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
  cartpush: async (cartItem, userid) => {
    try {
      // Find the user's cart or create a new one if it doesn't exist
      let userCart = await cart.findOne({ userid });

      console.log(userCart);

      if (!userCart) {
        const userCart = new Cart({ userid, items: [cartItem] });
      await userCart.save(); // Use the 'cart' model, not 'CartModel'
      }

      // Check if the product is already in the cart
      const existingItemIndex = userCart.items.findIndex(item => item.productid === cartItem.productid);

      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update the quantity
        userCart.items[existingItemIndex].quantity += cartItem.quantity;
      } else {
        // If the product is not in the cart, add it
        userCart.items.push(cartItem);
      }

      // Save the updated cart
      await userCart.save();
    } catch (error) {
      console.error(error);
      throw new Error('Error adding item to cart');
    }
  },

}
