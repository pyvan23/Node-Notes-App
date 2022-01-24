const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcryptjs = require("bcryptjs");
//datos del usuario
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
//ciframos el password,toma tiempo aplicar el hash asi que es metodo asyncrono
//modulo de bcryptjs
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = bcryptjs.hash(password, salt);
  return hash;
};
//modulo de bcryptjs
//esta funcion es cuando estamos loguendo al usuario
//usamos la funcion de ecmascript 5 para acceder al scope del password,con flecha no llega a obtener el password
UserSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
