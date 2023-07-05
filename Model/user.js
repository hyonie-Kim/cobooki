const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    id: { type: String, require: true, unique: true },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
