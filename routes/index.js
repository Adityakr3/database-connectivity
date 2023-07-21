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
    const User = await user.find();
    res.render("profile", { title: "profile", User });
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






router.get("/signout", function (req, res, next) {
  res.render("signout", { title: "signout" });
});





router.get("/forget", function (req, res, next) {
  res.render("forget", { title: "forget" });
});

module.exports = router;
