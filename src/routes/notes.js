const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/notes/add", (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", async (req, res) => {
  const { title, description } = req.body;

  const errors = [];
  if (!title) {
    errors.push({ text: "you need to put a title,please" });
  }
  if (!description) {
    errors.push({ text: "you need to put a description,please" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    await newNote.save();
    res.redirect("/notes");
  }
});

router.get("/notes", async (req, res) => {
  //voy a consultar la base de datos Note es el esquema,nos permite operar con la bese de datos
  //es un  proceso asincrono la consulta a la basse de datos asi que async and await
  const notes = await Note.find().lean().sort({date:'desc'});
  //la constante notes va a recibir unn arreglo
  res.render("notes/all-notes", { notes });
});

module.exports = router;
