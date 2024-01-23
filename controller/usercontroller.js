const user=require('../models/userschema')
const uhelper=require('../helpers/userhelper')

module.exports={
    signin:(req, res) => {
       if (req.session){
        res.redirect('/')
       }
       else{
        res.render('users/signin')
       }
    
    },
    signup:(req,res)=>{
        res.render('users/signup')
    },
   
    signupdata:async function (req, res) {
        console.log(req.body)
       var doc={ name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username
    }
    },
    userpage:(req, res) => {
        res.render('users/index');
    }
}