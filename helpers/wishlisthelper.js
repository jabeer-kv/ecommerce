const wishlist= require("../models/wishlistschema")
const user=require("../models/userschema")

module.exports={
    wishpush:async (item,userid)=>{
    try{

    let userwish= await wishlist.findOne({owner:userid})
    console.log("wishlist",userwish);
        if(!userwish){
            userwish=new wishlist({owner:userid,items:[item]})
            await userwish.save();
        }
        else{
            const existingItem=userwish.items.find(item=>item.productid&&item.productid.toString()==item.productid.toString())
            if(existingItem){
                // If the product already exists, update the quantity
                existingItem.quantity+=item.quantity;
            }
            else{
                userwish.items.push(item)
            }
            await userwish.save();
        }
    }
    catch(err){
        console.log(err);
        throw new Error("Error adding item to wishlist");
    }
},
getwish: async (userid) => {
    try {
        const userwish = await wishlist.findOne({ owner: userid }).lean();
        console.log(userwish);
        return userwish;
      } catch (error) {
        console.error("Error getting user wish", error);
        throw error;
      }
}
}