const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
module.exports = {
  cartpage: async (req, res) => {
    // const user = req.sesson.user.name;
    try {
      const userid = req.sesson.userid;
      const product = await Chelper.addcart(userid);
      const count = await Chelper.cartcount(product);
      console.log(count, product);
      const isUser = req.session.loggedIn;
      if (data) {
        total = product.totalprice + 50;
        res.render(users / cart, { product, count, isUser });
      } else {
        res.render(users / cart, { isUser });
      }
    } catch (error) {
      console.error(error);
    }
    res.render("users/cart");
  },
  addtocart: async (req, res) => {


  }
};
