const mongoose = require('mongoose');


//DB Connection
getConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp')
    
    console.log('Connection to DB Successful');
  } catch (err) {
    console.log('Connection to DB Failed');
  }
};
getConnection()
