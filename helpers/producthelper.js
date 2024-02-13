const product = require('../models/productschema');
module.exports = {
    productinsert: async (data) => {
        // console.log(data)
        var ans = await product.insertMany(data)
        console.log(ans)
        return ans
    },
    showpro: async (data) => {
        var ans = await product.find().lean()
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
    update: async (id,data) => {
        const ans = await product.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })

        return ans
    }

    }