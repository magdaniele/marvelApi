const mongoose = require("mongoose");
const { Schema } = mongoose;
const userModel = require("./users");

const heroesSchema = new Schema({
  name: String,
  description: String,
  picture: String,
  searcher : String,
  searchDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("heroes", heroesSchema);
