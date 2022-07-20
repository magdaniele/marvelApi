const express  = require("express");
const usersRouter = require("./src/routes/users");
const heroesRouter = require("./src/routes/heroes");
require('dotenv').config();
const envPort = process.env.PORT;
const app = express();
const database = require('./src/database/');
database.init();

const port = envPort || 3000;
app.use(express.json());

/* app.use('/users',usersRouter);
app.use('/heroes',heroesRouter); */


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })