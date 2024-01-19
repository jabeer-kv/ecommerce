const mongoose=require('mongoose');
const url=process.env.DB_URL 
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('connected to database')
}).catch((err)=>{
    console.log(err)
})
module.exports=connect 