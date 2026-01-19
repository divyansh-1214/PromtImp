const express = require("express");
const router = express.Router();
const User = require("../model/user");
const {
  add,
  getById,
  putById,
  removeById,
  get,
} = require("../controllers/userControler");
const auth = require("../middleware/auth");

// POST route to add a user
router.post("/add", add);
//get route to login the user
router.post("/login", get);
//GET by the specific ID
router.get("/get/:id", auth, getById);
//UPDATE the value
router.put("/put/:id", putById);
//Delete the user from the db
router.delete("/remove/:id", removeById);

module.exports = router;
