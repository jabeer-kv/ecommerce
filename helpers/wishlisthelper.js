const wishlist = require("../models/wishlistschema")
const user = require("../models/userschema")
const mongoose = require("mongoose");

module.exports = {
    wishpush: async (item, userid) => {
        try {

            let userwish = await wishlist.findOne({ owner: userid })
            console.log("wishlist", userwish);
            if (!userwish) {
                userwish = new wishlist({ owner: userid, items: [item] })
                await userwish.save();
            }
            else {
                const existingItem = userwish.items.find(item => item.productid && item.productid.toString() == item.productid.toString())
                if (existingItem) {
                    // If the product already exists, update the quantity
                    existingItem.quantity += item.quantity;
                }
                else {
                    userwish.items.push(item)
                }
                await userwish.save();
            }
        }
        catch (err) {
            console.log(err);
            throw new Error("Error adding item to wishlist");
        }
    },
    getwish: async (userid) => {
        try {
            const wish = await wishlist.findOne({ owner: userid })
                .populate({
                    path: 'items.product',
                    model: 'Products', // Assuming your product model is named 'Products'
                })
                .lean();
            return wish || { items: [] };
        } catch (error) {
            console.error("Error getting user wish", error);
            throw error;
        }
    },
    remove: async (userId, productId) => {
        try {
          let wish = await wishlist.findOne({ owner: new mongoose.Types.ObjectId(userId) });
    
          if (wish && wish.items && wish.items.length > 0) {
            const updatedItems = wish.items.filter(item => item.product.toString() !== productId);
    
            wish.items = updatedItems;
    
            await wish.save();
    
            return wish
          }
    
          return null; 
        } catch (error) {
          console.error(error);
          throw new Error("Error removing product from cart");
        }
      },
}