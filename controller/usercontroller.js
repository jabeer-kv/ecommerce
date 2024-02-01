const user = require("../models/userschema");
const prodata=require("../models/productschema")
const uhelper = require("../helpers/userhelper");
const phelper=require("../helpers/producthelper")
const bcrypt = require("bcryptjs");
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
  logindata: (req, res) => {
    console.log(req.body);
    user.finding(
      { username: req.body.username, password: req.body.password },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (data) {
            req.session.username = data.username;
            req.session.password = data.password;
            res.redirect("/users/home");
          } else {
            res.redirect("/");
          }
        }
      }
    );
  },
  signup: (req, res) => {
    res.render("users/signup");
  },

  signupdetail: async function (req, res) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const pepperSecret = pepper


    const passwordWithPepper = req.body.password + pepper;
    const hashedPassword = await bcrypt.hash(passwordWithPepper, salt);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      salt: salt,
      pepper: pepper,
      username: req.body.username,
    };

    const result = await uhelper.datainsert(user);
    res.redirect("/");
  },
  catch(error) {
    console.error("Error during user registration:", error);
    res.redirect("/signup");
  },

  userpage: async (req, res) => {
    const product= await phelper.showpro(prodata)

    res.render("users/index",{product});
  },
  logout: (req, res) => {
    // req.session.destroy()
    res.render("users/");
  },
  cartpage: (req, res) =>{
    res.render("users/cart")
  }
}
