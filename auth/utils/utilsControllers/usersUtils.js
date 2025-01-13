const User = require("../../models/User");
const { createNotificationFunction } = require("./notificationsUtils");

const createUserFunction = async (userData) => {
  try {
    const { _id, firstName, lastName, email, password, role, companyId } =
      userData;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      role,
    };
    if (_id) newUser._id = _id;
    if (companyId) newUser.companyId = companyId;
    const user = new User(newUser);

    const savedUser = await user.save();
    await createNotificationFunction({
      userId: savedUser._id,
      title: "Bienvenue sur BeeZnez",
      message: "Toute l'équipe BeeZnez vous souhaite la bienvenue !",
    });
    return savedUser;
  } catch (error) {
    throw error;
  }
};

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

const getUsersFunction = async ({ role, companyId }) => {
  try {
    if (role === "admin") {
      const users = await getAllUsers();
      return users;
    }
    if (role === "manager") {
      const users = await getEmployees(companyId);
      return users;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserFunction,
  getAllUsers,
  getEmployees,
  getUsersFunction,
};
