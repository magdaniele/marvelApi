const mongoose = require("mongoose");
const { Schema } = mongoose;

const lastLogin = new Schema({
  usermane : String,
  loginDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("lastLogin", lastLogin);
