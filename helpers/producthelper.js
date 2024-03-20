const product = require('../models/productschema');
module.exports = {
    productinsert: async (data) => {
        // console.log(data)
        var ans = await product.insertMany(data)
        console.log(ans)
        return ans
    },
    showpro: async (data) => {
        var ans = await product.find().lean().limit(8)
        console.log(ans)
        return ans
    },
    shopro: async (data) => {
        var ans = await product.find().lean().limit(8)
        console.log(ans)
        return ans
    },
    findproductbyid: async (data) => {
        const products = await product.findOne({ _id: data }).lean()
        return products
    },
    showproduct: async (data) => {
        const show = await product.find(data).lean()
        return show
    },
    update: async (id, data) => {

        const ans = await product.findByIdAndUpdate({ _id: id }, {
            $set:
            {
                name: data.name,
                category: data.category,
                quantity: data.quantity,
                description: data.description,
                price: data.price,
                image: data.image
            }
        }, { new: true }).lean()
        console.log("kjhk",ans)
        return ans

    },
    deleting: async (id) => {
        const deleted = await product.findByIdAndDelete({ _id: id }).lean()
        console.log(deleted)
        return deleted
    }

}
