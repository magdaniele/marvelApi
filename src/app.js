const express  = require("express");
const morgan  = require("morgan");
const usersRouter = require("./routes/users");
const app = express();
const database = require('./database');

database.init(); // Initialize the database

app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(morgan('dev')); // Log requests to console
app.use('/',usersRouter); // Add the users router to the app


module.exports = app;