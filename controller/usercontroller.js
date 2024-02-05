const user = require("../models/userschema");
const prodata = require("../models/productschema")
const uhelper = require("../helpers/userhelper");
const phelper = require("../helpers/producthelper")
const bcrypt = require("bcrypt");
const pepper = process.env.PEPPER_SECRET;

module.exports = {
  signin: (req, res) => {
    //    if (req.session){
    //     //    res.redirect('/users/home')

    //    }
    //    else{
    //     res.render('users/signin')
    //    }
    res.render("users/signin");
  },
  logindata: async (req, res) => {
    // const {email, password }=req.body 
    const password=req.body.password
    const email=req.body.email
    const user= await uhelper.finding(email)
    const pass=user.password
    console.log(pass);
    // console.log(password)
    // console.log(user.password);
    const orgpassword= await bcrypt.compare(password,pass)
    console.log(orgpassword)
    
  },
  signup: (req, res) => {
    res.render("users/signup");
  },

  signupdetail: async function (req, res) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // const pepperSecret = pepper


    // const passwordWithsalt= req.body.password + salt;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    };

    const result = await uhelper.datainsert(user);
    res.redirect("/signin");
  },
  catch(error) {
    console.error("Error during user registration:", error);
    res.redirect("/signup");
  },
  

  userpage: async (req, res) => {
    const product = await phelper.showpro(prodata)

    res.render("users/index", { product });
  },
  logout: (req, res) => {
    // req.session.destroy()
    res.render("users/");
  },
  cartpage: (req, res) => {
    res.render("users/cart")
  }
}
