const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper")
const Uhelper=require("../helpers/userhelper");
module.exports = {
  cartpage: async (req, res) => {
    const user = req.sesson.user.name;
    try {
      const userid = req.sesson.userid;
      const product = await Chelper.addcart(userid);
      const count = await Chelper.cartcount(product);
      console.log(count, product);
      const isUser = req.session.loggedIn;
      if (product) {
        total = product.totalprice + 50;
        res.render('users/cart', { product, count, isUser });
      } else {
        res.render('users/cart', { isUser });
      }
    } catch (error) {
      console.error(error);
    }
    res.render("users/cart");
  },
  addtocart: async (req, res) => {
    var cartquantity=0
    const productid= req.params.id
    const userid= req.body.user.id
    const cart = await Chelper.existcart(userid)
    const extproduct=await Chelper.proext(userid,productid)
    if(extproduct){
      var founditem=extproduct.items.find(item => item.Phelper.tostring()==productid);
      var cartquantity=founditem.quantity
    }
    const productqty=await Chelper.finding(productid)
    if (productqty.quantity>cartquantity){
      const quantity=req.query.quantity || 1
      const cartitem={
        product:productid,
        quantity:quantity
      }
      count=await Chelper.countitems(userid)
    }
    if(cart){
      if(extproduct){
        await Chelper.cartupdate(cartitem,userid)
           res.json(count+1)
      }
      else{
        await Chelper.pushitem(userid,cartitem)
        res.json(count + 1)
      }

    }



    

  

  }
};
