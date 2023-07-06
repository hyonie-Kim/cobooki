const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
