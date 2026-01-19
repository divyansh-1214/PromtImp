const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.add = async (req, res) => {
  const { name, email, password, linkdinUname, leetcodeUname, skills, bio } =
    req.body;
  try {
    const newUser = new User({
      name,
      email,
      password,
      linkdinUname,
      leetcodeUname,
      skills,
      bio,
    });
    console.log(newUser);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User added successfully", id: newUser.id });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//this functions is used to login based on the mail and the password
exports.get = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fix: Change from User.findOne(email) to User.findOne({ email })
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "user not found with this mail" });
    }

    const myPassword = user.password;
    if (myPassword == password) {
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        algorithm: "HS256",
      });
      return res.status(200).json({ user, token: token });
    } else {
      return res.status(401).json({ message: "wrong password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "error add in the user" });
    console.log(err);
  }
};

exports.putById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const newUser = req.body;
    const user = await User.findByIdAndUpdate(id, newUser);
    if (!user) res.status(404).json({ message: "User not found" });
    const UpdatedUser = await User.findById(id);
    res.status(201).json({ message: "user details upadted" });
  } catch (err) {
    res.status(500).json({ error: "user not have been added" });
    console.log(err);
  }
};
exports.removeById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) res.status(404).json({ message: "User not found" });
    res.status(201).json({ message: "user have been removed" });
  } catch (err) {
    res.status(500).json({ error: "user not have been removed" });
    console.log(err);
  }
};
