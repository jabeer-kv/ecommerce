const Chelper = require('../helpers/carthelper')
const Phelper = require('../helpers/producthelper')
module.exports = {
    cartpage: (req, res) => {
        res.render("users/cart")
    },
    addtocart: async (req, res) => {
       
       
        try {
            const userid = req.session.user._id 
            

        }
        catch{

        }
}

}


