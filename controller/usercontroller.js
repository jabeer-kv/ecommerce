const user=require('../models/userschema')
const uhelper=require('../helpers/userhelper')

module.exports={
    signin:(req, res) => {
    //    if (req.session){
    //     //    res.redirect('/users/home')

    //    }
    //    else{
    //     res.render('users/signin')
    //    }
       res.render('users/signin')
    },
    logindata:(req,res)=>{
            console.log(req.body)
            user.finding({username:req.body.username,password:req.body.password},(err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    if(data){
                        req.session.username=data.username
                        req.session.password=data.password
                        res.redirect('/users/home')
                    }
                    else{
                        res.redirect('/signin')
                    }
                }
            })
    },
    signup:(req,res)=>{
        res.render('users/signup')
    },
   
    signupdetail:async function (req, res) {
        try{
        console.log(req.body)
       var doc={ name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username
       }

       const result = await uhelper.datainsert(doc)
       res.redirect('/signin')
    }
       catch {
        res.redirect('/signup')
    }
    },
    userpage:(req, res) => {
        res.render('users/index');
    },
    logout:(req,res)=>{
        req.session.destroy()
        res.redirect('/signin')
    }
}