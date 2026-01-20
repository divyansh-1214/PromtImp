const express = require("express");
const dotenv = require("dotenv");
const { gemini, meta, llama, conference } = require("./function/ai");
// // const serverless = require('serverless-http');

const cors = require("cors"); // Add this line
dotenv.config();
const connectDB = require("./db/db");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const furl = process.env.FRONTEND_URL;
console.log(furl);
app.use(
  cors({
    origin: furl || "http://localhost:5173",
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/user", require("./routes/userRoutes"));
app.use("/enhance", require("./routes/enhanceRouter"));
// app.use("/ai", require("./routes/"));
connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// module.exports = app;
// module.exports.handler = serverless(app);
//
