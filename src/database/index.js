const mongoose = require("mongoose");
require("dotenv").config();
const { POSTGRES_DB:database, POSTGRES_USER: user, POSTGRES_PASSWORD: password } = process.env;

const init = async () => {
  try {
    const connectionString = `mongodb+srv://${user}:${password}@${database}.imc4u.mongodb.net/?retryWrites=true&w=majority`;
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
