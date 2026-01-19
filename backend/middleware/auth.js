const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_TOKEN = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // console.log(token); // Avoid logging tokens in production

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_TOKEN, { algorithm: "HS256" });
    req.user = decoded;
    // console.log(req.user); // For debugging only
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = auth;
