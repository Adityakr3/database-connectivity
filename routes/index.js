var express = require("express");
var router = express.Router();
const user = require("../models/userModel");
/* GET home page. */


router.get("/", function (req, res, next) {
  res.render("index", { title: "Homepage" });
});



router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "signup" });
});



router.post("/signup", async function (req, res, next) {
  try {
    const newuser = new user(req.body);
    await newuser.save();
    res.redirect("/signin");
  } catch (error) {
    res.send(error);
  }
});




router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "signin" });
});

router.post("/signin", async function (req, res, next) {
  try {
    const { name, password } = req.body;
    const users = await user.findOne({ name });
    if (users === null) {
      return res.send(`user not found.<a herf="/signin"> signin </a>`);
    }
    if (users.password !== password) {
      return res.send(`password worng.<a herf="/signin"> signin </a>`);
    }
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});



router.get("/profile", async function (req, res, next) {
  try {
    const Users = await user.find();
    res.render("profile", { title: "profile", User:Users });
  } catch (error) {
    res.send(error);
  }
});




router.get("/delete/:id", async function (req, res, next) {
  try {
    await user.findOneAndDelete({_id:req.params.id});
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});
// update router add 

router.get('/update/:userId',async(req,res,next)=>{
  var currentUser =await user.findOne(
    {_id : req.params.userId}
  )
  res.render("update",{
    user:currentUser,title:"Edit User"
  })
})
router.post('/update/:user_id',async(req,res,next)=>{
  console.log(req.json)
  var currentUser = await user.findOneAndUpdate({_id:req.params.user_id},{
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
  
  })
  res.redirect('/profile')
})




router.get("/signout", function (req, res, next) {
  res.render("signout", { title: "signout" });
});





router.get("/forget", function (req, res, next) {
  res.render("forget", { title: "forget" });
});

module.exports = router;
