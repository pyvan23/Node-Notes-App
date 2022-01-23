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
    })
  } else {
    const newNote = new Note({ title, description });
    await newNote.save();
    req.flash("success_m"," It was save it");
    res.redirect("/notes");
  }
});

router.get("/notes", async (req, res) => {
  //voy a consultar la base de datos Note es el esquema,nos permite operar con la bese de datos
  //es un  proceso asincrono la consulta a la basse de datos asi que async and await
  const notes = await Note.find().sort({ date: "desc" });
  //la constante notes va a recibir unn arreglo
  res.render("notes/all-notes", { notes });
});

router.get("/notes/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("notes/edit-note", { note });
});

router.put("/notes/edit-note/:id", async (req, res) => {
  const { title, description } = req.body;
  //buscamospor id y actualizamos,le pasamosel id desde el params,y actualizamos title des...
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_m","It was updated successfully");
  res.redirect("/notes");

  router.delete("/notes/delete/:id", async (req, res) => {
    await Note.findByIdAndRemove(req.params.id);
    req.flash("success_m","It Was Deleted");
    res.redirect("/notes");
  });
});

module.exports = router;
