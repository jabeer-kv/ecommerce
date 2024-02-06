const user = require("../models/userschema");
const prodata = require("../models/productschema")
const uhelper = require("../helpers/userhelper");
const phelper = require("../helpers/producthelper")
const bcrypt = require("bcrypt");
const pepper = process.env.PEPPER_SECRET;

module.exports = {
  signin: (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/')

    }
    else {
      res.render('users/signin')
    }
  },
  logindata: async (req, res) => {
    // const {email, password }=req.body 
    const password = req.body.password
    const email = req.body.email
    console.log(email, password);
    const user = await uhelper.finding(email)
    console.log(user)
    if (!user) {
      res.redirect("/signin")
      console.log("error")
    }

    else {

      const pass = user.password
      const orgpassword = await bcrypt.compare(password, pass)
      req.session.userId = user.id
      req.session.loggedIn = true
      if (user.role == 'admin') {
        res.redirect("admin/")
        console.log("admin logged in");
      }
      else {
        console.log("user logged in");
        res.redirect("/")
      }
    }
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
    const users = req.session.loggedIn
    res.render("users/index", { product, users });
  },
  logout: (req, res) => {
    req.session.destroy()
    res.render("users/");
  }
  
}
