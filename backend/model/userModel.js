const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
