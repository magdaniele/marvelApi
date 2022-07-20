const mongoose = require("mongoose");
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;

const init = async () => {

  try {
    await mongoose.connect(connectionString);
    console.log("Connected to the database sucessfully!");
  } catch (err) {
    console.error(
      `Error connecting to database ->`,
      `Error code: ${err.code}, error reference: ${err.codeName}, message: ${err.message}`
    );
  }
};

const disconnect = () => {
  mongoose.connection.close();
};

module.exports = { init, disconnect };