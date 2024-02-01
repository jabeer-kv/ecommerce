const mongoose=require('mongoose');

const cartschema=new mongoose.schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model('carts', cartschema);