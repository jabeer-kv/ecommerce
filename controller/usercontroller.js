const user = require("../models/userschema");
const prodata = require("../models/productschema")
const uhelper = require("../helpers/userhelper");
const phelper = require("../helpers/producthelper")
const bcrypt = require("bcrypt");
const Chelper=require("../helpers/carthelper")



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
      res.render("users/signin", { error: "Invalid email." })
      console.log("error")
    }

    else {
      
      const pass = user.password
      console.log("just ", pass);
      const orgpassword = await bcrypt.compare(password, pass)
      console.log("org",orgpassword);
      if(!orgpassword){
        console.log("Invalid password");
        return  res.render("users/signin", { error: "Invalid  password." });
      }
      req.session.userId = user._id
      req.session.name=user.name
      console.log(req.session.userId)
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
    const userId = req.session.userId
    const cart = await Chelper.getCart(userId);    
    const totalPrice = uhelper.calculatetotalPrice(cart.items);
    res.render("users/index", { product, users,totalPrice});
  },
  logout: (req, res) => {
    req.session.destroy()
    res.render("users/signin");
  },
  edit: async (req,res)=>{
    const users=req.session.userId
    console.log(users);
    const data=await uhelper.finduser(users)
    // console.log(user,user.name,user.email);
    res.render("users/useredit",{data,users})
  },
  updateuser: async (req,res)=>{
    const users=req.session.userId
    const user=await uhelper.finduser(users)
    console.log(user);
    const data={
      name:req.body.name,
      email:req.body.email,
      username:req.body.username
    }
    console.log(data);
    // const user=await uhelper.updateuser(users,data)
    res.render("users/useredit",{data,users})
  },
  search:async(req,res)=>{
    const users=req.session.userId
    const search =req.body.query
    console.log(search);
  const products= await prodata.find({ name: { $regex: `^${search}`, $options: 'i' } }).lean();
  console.log(products);
  res.render("users/search",{search:products,users})
  },
  view:async(req,res)=>{
    const users=req.session.userId
    const product = await phelper.shopro(prodata)
    res.render("users/view", { product:product,users})
  },
  showproduct:async(req,res)=>{
    const users=req.session.userId
    const productid = req.params.id;
    const product = await phelper.findproductbyid(productid);
    res.render("users/productshow",{products:product,users})
  },
  fruits: async (req, res) => {
  
    const users = req.session.loggedIn;
    const products = await prodata.find({ category: "fruits" }).lean();
    console.log("hello",products);
    res.render("users/vegitable", { vegitable:products, users });
  },
  veg: async (req, res) => {
    const users = req.session.loggedIn;
    const product = await prodata.find({ category: "vegitables" }).lean();
    console.log("hello",product);
    res.render("users/vegitable", { vegitable:product, users });
  },
  drinks: async (req, res) => {
  
    const users = req.session.loggedIn;
    const pro = await prodata.find({ category: "drinks" }).lean();
    console.log("hello",pro);
    res.render("users/vegitable", { drink:pro, users });
  },

}
