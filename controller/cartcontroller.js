const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper")
const Uhelper = require("../models/userschema")
module.exports = {
    cartpage: async (req, res) => {
      // const user = req.session.user;
      try {
        const userid = req.session.userid;
        const productid=req.params.id
        console.log(userid, productid);
        const product = await Chelper.addcart(userid, productid);
        const count = await Chelper.cartcount(product);
        
        
        console.log(count, product);
        const isUser = req.session.loggedIn;
    
        if (product && isUser) {
          
          total = product.totalprice + 50;
      } else {
          res.render('users/cart', { isUser });
      }
      }
       catch (error) {
        console.error(error);
      }
      
    },
addtocart: async (req, res) => {
    try {
      const productid = req.params.id;
      const userid = req.session.userid;
      
    
      const product = await Phelper.findproductbyid(productid);
     
      const cartItem = {
        productid: productid,
        quantity: 1,
        product: product,
      };
      console.log(cartItem);

      await Chelper.cartpush(cartItem, userid);

      res.redirect("/cart");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  }



