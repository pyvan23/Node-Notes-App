

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const handlebars = require("handlebars");
const passport = require("passport");
const  {getConnection}  = require("./datebase");
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

 //initialization
 const app = express();
 require("./config/passport");
 getConnection()

//Setting

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

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_m = req.flash("success_m");
  res.locals.error_m = req.flash("error_m");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//routes

app.use(require("./routes/index"));
app.use(require("./routes/users"));
app.use(require("./routes/notes"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Server is listenning
app.listen(process.env.PORT || 3000, () => {
  console.log("The server is on port", process.env.PORT || 3000);
});
