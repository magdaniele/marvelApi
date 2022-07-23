const mongoose = require("mongoose");
const { ROLES } = require("../../config/constants");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ROLES,
    default: ROLES.user,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
