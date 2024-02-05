const mongoose=require('mongoose');

const cartschema=new mongoose.schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    products:[productSchema]
    

})
const productSchema=new mongoose.schema({
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('carts', cartschema);