const express  = require("express");
const morgan  = require("morgan");
const usersRouter = require("./routes/users");
//const heroesRouter = require("./routes/heroes");
const app = express();
const database = require('./database');
database.init();

app.use(express.json());
app.use(morgan('dev'));
app.use('/',usersRouter);
/* app.use('/heroes',heroesRouter); */


module.exports = app;