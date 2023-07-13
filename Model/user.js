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
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: { type: String, require: true },
    detailAddress: { type: String },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      require: true,
    },
    userNum: String,
  },
  { collection: "users", timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
