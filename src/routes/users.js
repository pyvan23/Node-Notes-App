const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  //con express validator se haria mas sencilo las validacions
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
    /* const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_m", "the email already used");
      res.redirect('/users/signup')
    }*/
    //estoy creando un nuevo usuario,y nos entrega un objeto nuevo
    const newUser = new User({ name, email, password });
    //le cambio la propiedad password
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_m", "Registered");
    res.redirect("/users/signin");
  }
});

module.exports = router;
