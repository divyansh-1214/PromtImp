const express = require("express");
const router = express.Router();
const { enhance } = require("../controllers/enhanceControler");
router.post("/", enhance);

module.exports = router;
