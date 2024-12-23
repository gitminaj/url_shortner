const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");

const router = express.Router();

// home page
router.get("/",restrictTo(['NORMAL']) ,async (req, res) => {

  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrls });
});

// signup page
router.get('/signup', (req, res) =>{
  return res.render('signup');
});

// login page
router.get('/login', (req, res) =>{
  return res.render('login');
});


module.exports = router;
