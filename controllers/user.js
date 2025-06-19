const { response } = require("express");

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

const userCreate = (req, res) => {
  const { name, age } = req.body;
  res
    .status(201)
    .json({ message: "Create controller", status: "success", name, age });
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
