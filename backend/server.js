const express = require("express");
const dotenv = require("dotenv");
const { gemini, meta } = require("./function/ai");
// // const serverless = require('serverless-http');

const cors = require("cors"); // Add this line
dotenv.config();
const connectDB = require("./db/db");
const furl = process.env.FRONTEND_URL;
console.log(furl);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: furl })); // Add this line
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/user", require("./routes/userRoutes"));
// app.use("/ai", require("./routes/"));
connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on http://localhost:5000");
});
// module.exports = app;
// module.exports.handler = serverless(app);
