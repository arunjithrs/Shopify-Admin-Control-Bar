const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function () {
  const connection = {};
  if (connection.isConnected) {
    console.log("connected to database");
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
};
