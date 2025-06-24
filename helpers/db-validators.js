const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const validRoles = await Role.findOne({ role });
  if (!validRoles) {
    throw new Error(`The role ${role} is not registered in the database`);
  }
};

const isexistEmail = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error("Email already exists");
  }
};

const isexistUserById = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`User does not exist ${id}`);
  }
};

module.exports = {
  isRoleValid,
  isexistEmail,
  isexistUserById,
};
