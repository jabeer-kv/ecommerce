const user = require("../models/userschema")
const checkout = require("../models/checkoutschema")
const cart = require("../models/cartschema")

module.exports = {
  finduser: async (data) => {
    const users = await user.findOne({ _id: data })
    console.log(users)
    return users
  },
  update: async (data) => {
    const insert = await checkout.insertMany(data)
    console.log(insert);
    return insert
  },
  calculatetotalPrice: (items) => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 50);
  },
  getCart: async (userId) => {
    try {

      const Cart = await cart.findOne({ owner: userId })
        .populate({
          path: 'items.product',
          model: 'Products', // Assuming your product model is named 'Products'
        })
        .lean();
      console.log(Cart);
      return Cart || { items: [] };
    } catch (error) {
      throw new Error('Error getting cart');
    }
  },
  updatestatus: async (orderID, paymentId) => {
    console.log(orderID,paymentId)
    await checkout.findOneAndUpdate(
      { orderid: orderID },
      {
        $set: { status: "placed", paymentid: paymentId },
      },
      { new: true }
    );
  },
}

