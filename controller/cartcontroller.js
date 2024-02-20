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
      console.log("kfdjhk");
      var cartquantity=0
      const productid= req.params.id
      const userid=req.session.userId
      const product = await Phelper.findproductbyid(productid)
      // const price = product.price
      console.log(product);
      console.log(userid);

      try {
      const arrayItems = {
        productid: productid,
        quantity: 1,
        // price:price,
      }
      await Chelper.cartpush(arrayItems, userid);

      res.redirect("/users/cart");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });

    }
      // const cart = await Chelper.existcart(userid)
      // const extproduct=await Chelper.proext(userid,productid)

    //   if(extproduct){
    //     var founditem=extproduct.items.find(item => item.Phelper.tostring()==productid);
    //     var cartquantity=founditem.quantity
    //   }
    //   const productqty=await Chelper.finding(productid)
    //   if (productqty.quantity>cartquantity){
    //     const quantity=req.query.quantity || 1
    //     const cartitem={
    //       product:productid,
    //       quantity:quantity
    //     }
    //     count=await Chelper.countitems(userid)
    //   }
    //   if(cart){
    //     if(extproduct){
    //       await Chelper.cartupdate({cartitem},userid)
    //          res.json(count+1)
    //     }
    //     else{
    //       await Chelper.pushitem(userid,cartitem)
    //       res.json(count + 1)
    //     }

    //   }
    // }
  }
}



