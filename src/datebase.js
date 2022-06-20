const mongoose = require("mongoose");
require("dotenv").config();

//DB Connection
const getConnection = () => {
  try {
    mongoose.connect.toString(process.env.MONGODB_URI);
    console.log("Connection to DB...");
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getConnection };
