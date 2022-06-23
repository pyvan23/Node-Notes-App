const mongoose = require("mongoose");
require("dotenv").config();

//DB Connection
const getConnection = async () => {
  try {
    await mongoose.connect( process.env.MONGODB_URI );
    console.log(process.env.MONGODB_URI)
    console.log("Connection to DB Successful");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getConnection };
