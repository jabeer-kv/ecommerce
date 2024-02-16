const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper")
const Uhelper = require("../models/userschema")
module.exports = {
    cartpage: async (req, res) => {
      // const user = req.session.user;
      try {
        const userid = req.session.userid;
        const product = await Chelper.addcart(userid);
        const count = await Chelper.cartcount(product);
        
        console.log(count, product);
        const isUser = req.session.loggedIn;
    
        if (product && isUser) {
          
          total = product.totalprice + 50;
          res.render('users/cart', { product, count, isUser });
      } else {
          res.render('users/cart', { isUser });
      }
      }
       catch (error) {
        console.error(error);
      }
      
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
          await Chelper.cartupdate({cartitem},userid)
             res.json(count+1)
        }
        else{
          await Chelper.pushitem(userid,cartitem)
          res.json(count + 1)
        }

      }







    }
  };
//   addToCart : async (req, res) => {
//     try {
      
//       const productId = req.params.id;


//       const product = await Product.findById(productId);

//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }

//       const userId = req.session.userId; 
//       let cart = await Cart.findOne({ owner: userId });

//       if (!cart) {
//         cart = new Cart({ owner: userId });
//       }


//       const itemIndex = cart.items.findIndex((item) => item.product === productId);

//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += 1;
//       } else {
//         cart.items.push({ product, quantity: 1 });
//       }

//       await cart.save();


//       const totalPrice = calculateTotalPrice(cart.items);


//       if (req.xhr) {
//         res.json({ message: 'Product added to cart!', cart: cart })
//       } else {
//         res.redirect('/cart'); // Assuming traditional navigation
//       }
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

//   // Function to calculate total price (optional)
//   calculateTotalPrice: async (req,res,items) => {
//   let total = 0;
//   for (const item of items) {
//     total += item.product.price * item.quantity;
//   }
//   return total;
// }
// }