require("dotenv").config();
const db = process.env.MONGO_URI;
const mongoose = require("mongoose");
if (!db) {
  console.error("backend uri not sert");
  process.exit(1);
}

const connectDB = async () => {
  try {
    mongoose.connect(db);
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
