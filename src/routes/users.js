const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});
router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
 
  if (name <= 0) {
    errors.push({ text: "The name must be have more than one character" });
  }
  if (password != confirm_password) {
    errors.push({ text: "password do not match" });
  }
  if (password.length < 4) {
    errors.push({ text: "password must be have more than 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
   
    const newUser = new User({ name, email, password });
    
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_m", "Registered");
    res.redirect("/users/signin");
  }
});
router.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
