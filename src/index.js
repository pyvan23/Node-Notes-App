const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const handlebars = require("handlebars");

//initialization
const app = express();
require("./datebase");

//Setting
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", ".hbs");

//middelwaares

//para recibir los datos y que podamos entederlo,false por que solo recibimos datos no imagenes
app.use(express.urlencoded({ extended: false }));
//nos sirve para que los formularios puedaan enviar mas metdos que solo post y get
app.use(methodOverride("_method"));
//para guardar las sesiones de los usuarios,poder autenticar a el usuario y poder almacenar las sesiones temporalmente
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
//nos permitecrear carteles confirmando las operaciones como borrado,actualizacion etc
//app.use(flash());

//Global vriables (usamos el next por que va a seguir procesando y atorarse y siga con las demas rutas ya que node es de un solo hilo)
/*app.use((req, res, next) => {
  res.locals.success_msg = req.flash("Success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});*/

//routes

app.use(require("./routes/index"));
app.use(require("./routes/users"));
app.use(require("./routes/notes"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Server is listenning
app.listen(app.get("port"), () => {
  console.log("The server is on port", app.get("port"));
});
