const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const usersGet = (req, res) => {
  const { data, name } = req.query;
  res
    .status(200)
    .json({ message: "Get controller", status: "success", data, name });
};

const userUpdate = (req, res) => {
  const id = req.params.id;
  res.json({ message: "Update controller", status: "success", id });
};

const userCreate = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json({
      message: "Email already exists",
      status: "error",
    });
  }

  await user.save();
  res
    .status(201)
    .json({ message: "Create controller", status: "success", user });
};

const userDelete = (req, res) => {
  res.json({ message: "Delete controler", status: "success" });
};

module.exports = {
  usersGet,
  userUpdate,
  userCreate,
  userDelete,
};
