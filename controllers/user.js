const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const usersGet = async (req, res) => {
  //const { data, name } = req.query;
  const { limit, skip = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)).skip(Number(skip)),
  ]);

  res.status(200).json({ total, users });
};

const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({ message: "Update controller", status: "success", user });
};

const userCreate = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res
    .status(201)
    .json({ message: "Create controller", status: "success", user });
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  //const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({ message: "Delete controler", status: "success", user });
};

module.exports = {
  usersGet,
  userUpdate,
  userCreate,
  userDelete,
};
