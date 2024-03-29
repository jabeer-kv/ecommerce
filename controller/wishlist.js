const Chelper = require("../helpers/carthelper");
const Phelper = require("../helpers/producthelper");
const Whelper = require("../helpers/wishlisthelper")
module.exports = {
    addtowishlist: async (req, res) => {
        try {
            const productid = req.params.id;
            const userid = req.session.userId;
            
            const product = await Phelper.findproductbyid(productid);
            if (!userid) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            const wish = {
                productid: productid,
                product: product
            }
            console.log("wish item:", wish);
            await Whelper.wishpush(wish, userid);
            res.redirect("/wishlist")

        }
        catch (err) {
            console.log(err);
        }
    },
    wishlist: async (req, res) => {
        try {
            const userid = req.session.userId;
            const users = req.session.loggedIn
            const wishlists = await Whelper.getwish(userid)
            console.log(userid, wishlists);


            res.render('users/wishlist', { wishlist:wishlists.items, users })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server error' });
        }

    },
    removeformwish: async (req,res)=>{
        const userid=req.session.userId
        const productid=req.params.id
        await Whelper.remove(userid,productid)
    }
}
