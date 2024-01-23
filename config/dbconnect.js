const mongoose=require('mongoose');
const url=process.env.DB_URL 

const connect = mongoose.connect(url)
.then(()=>{
    console.log('connected to database')
}).catch((err)=>{
    console.log(err)
})
module.exports=connect 