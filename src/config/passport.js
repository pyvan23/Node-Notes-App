//este modulo nos permite la autenticacion,via google,github o lo que sea,en este caso sera de manera local
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    }, //done es un callback
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        //el callback sirve  para terminar el proceso de autenticacion,null para el usuario que no  habido error
        //false que no hat usuario
        return done(null, false, { message: "The user doesn`t exist " });
      } else {
        //validamos la contraseña del usuario que existe en la bd
        const match = user.matchPassword(password);
        if (match) {
          //null para el error,que no hay,y le  devuelvo el usuario
          return done(null, user);
        } else {
          return done(null, false, { message: "incorrect password" });
        }
      }
    }
  )
);
//toma un user y un callback,gurdamos en una sesion el id del usuario,para evitar pedir el login constantemente
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//si hay un usuario en la sesion,busca el id del usuario
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
