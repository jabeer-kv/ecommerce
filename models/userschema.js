const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    username:{
        type:String,
        required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true,
        // validate:{
        //     validator:function(v){
        //         return v.length>=8
        //     },
        //     message:'password must be at least 8 characters long'

        // }
    }

})

const User=mongoose.model('Users',userschema)
module.exports=User