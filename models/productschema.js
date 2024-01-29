const mongoose=require ('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    category:{
        type:String,
        // required:true
    },
    quantity:{
        type:Number,
        // required:true
    },
    description:{
        type:String,
        // required:true
    },
    price:{
        type:Number,
        // required:true
    },
    image:{
        type:String,
        
    }
})

const product=mongoose.model('Products',productSchema)
module.exports=product