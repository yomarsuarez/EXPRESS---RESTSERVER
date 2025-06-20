const Role = require("../models/role");

const isRoleValid = async (role = "") => {
  const validRoles = await Role.findOne({ role });
  if (!validRoles) {
    throw new Error(`The role ${role} is not registered in the database`);
  }
};

module.exports = {
  isRoleValid,
};
