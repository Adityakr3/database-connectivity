var express = require('express');
var router = express.Router();
const user = require("../models/userModel");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'signup' });
});

router.post('/signup',async function(req, res, next) {
  try {
    const newuser = new user(req.body);
    await newuser.save()
    res.redirect("/signin");
  } catch (error) {
    res.send(error)
  }
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'signin' });
});
router.get('/signout', function(req, res, next) {
  res.render('signout', { title: 'signout' });
});

router.get('/forget', function(req, res, next) {
  res.render('forget', { title: 'forget' });
});

module.exports = router;
