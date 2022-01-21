const express = require("express");
const router = express.Router();

router.get("/notes/add", (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", (req, res) => {
  const {title,description}= JSON.parse(JSON.stringify(req.body));
  console.log(title);
  console.log(description);
  /* const errors = [];
  if (!title) {
    errors.push({ text: "you need to put a title,please" });
  }
  if (!description) {
    errors.push({ text: "you need to put a description,please" });
  }
  if (errors.length > 0) {
    res.render("/notes/new-note", {
      errors,
      title,
      description,
    });
  } else {*/
  res.send("ok");
});

router.get("/notes", (req, res) => {
  res.send({ name: "notas desde la base de datos" });
});

module.exports = router;
