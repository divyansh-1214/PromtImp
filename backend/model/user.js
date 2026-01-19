const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Enter your mail"],
    },
    password: {
      type: String,
      required: [true, "Enter password"],
    },
  },
  {
    timestamps: true,
  },
);

const user = mongoose.model("user", userSchema);
module.exports = user;
