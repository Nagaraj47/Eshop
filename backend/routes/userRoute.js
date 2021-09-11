const User = require("../model/userModel");
const express = require("express");

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or password." });
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    const newUser = await user.save();

    res.send(newUser);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.send(users);
  } catch (err) {
    res.send({ message: err.message });
  }
});

router.delete("/customers/:_id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params._id);
    res.send(user);
  } catch (err) {
    res.send({ message: err.message });
  }
});

router.get("/customers/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    res.send(user);
  } catch (err) {
    res.send({ message: err.message });
  }
});
router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Nagaraj",
      email: "admin@gmail.com",
      password: "admin",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    res.send({ msg: err.message });
  }
});
module.exports = router;
