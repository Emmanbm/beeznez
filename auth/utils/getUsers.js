const User = require("../models/User");

const getAllUsers = async () => {
  try {
    const users = await User.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        role: 1,
        isActive: 1,
        companyId: 1,
      }
    );

    return users;
  } catch (error) {
    throw error;
  }
};

const getEmployees = async (companyId) => {
  try {
    const users = await User.find(
      { companyId },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        role: 1,
        isActive: 1,
        companyId: 1,
      }
    );
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getEmployees,
};
