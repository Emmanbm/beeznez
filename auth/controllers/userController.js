require("dotenv").config();
const { default: mongoose } = require("mongoose");
const Company = require("../models/Company");
// const Notification = require("../models/Notification");
const User = require("../models/User");
const getErrorMessages = require("../utils/getErrorMessages");
const { checkPassword } = require("../utils/passwordUtils");
const { generateToken, decodeToken } = require("../utils/tokenUtils");
// const { getInvitationCode } = require("../utils/getInvitationCode");
// const sendConfirmationEmail = require("../utils/sendConfirmationEmail");
const {
  getUsersFunction,
  createUserFunction,
} = require("../utils/utilsControllers/usersUtils");
const {
  // getCompaniesFunction,
  getCompanyInvitationCode,
} = require("../utils/utilsControllers/companiesUtils");
const {
  getNotificationsFunction,
} = require("../utils/utilsControllers/notificationsUtils");
// const { getTasksFunction } = require("../utils/utilsControllers/tasksUtils");
// const { getProjectsFunction} = require("../utils/utilsControllers/projectsUtils");

const cookieSettings = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
  maxAge: 24 * 60 * 60 * 1000, // 24 heures
};

const getUsers = async (req, res) => {
  try {
    const { companyId } = req.query;
    const { role } = req.auth;
    const users = await getUsersFunction({ role, companyId });
    // console.log(JSON.stringify(users, null, 2));

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email: emailAddress, password } = req.body;
    const user = await User.findOne({ email: emailAddress });

    if (!user)
      return res.status(401).json({ message: "Cet utilisateur n'existe pas" });

    const match = await checkPassword(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const { id, firstName, lastName, email, role, profilePicture, companyId } =
      user;

    const token = generateToken({
      id,
      firstName,
      lastName,
      email,
      role,
    });

    res.cookie("token", token, cookieSettings);

    // const [users, companies, notifications, tasks, projects] =
    const [users, notifications, invitationCode] = await Promise.all([
      getUsersFunction({ role, companyId }),
      // getCompaniesFunction(),
      getNotificationsFunction({ id }),
      // getTasksFunction({ id }),
      // getProjectsFunction({ companyId, userId: id, role }),
      getCompanyInvitationCode({ role, companyId }),
    ]);

    res.status(200).json({
      user: {
        id,
        firstName,
        lastName,
        email,
        role,
        profilePicture,
        companyId,
        notifications,
        users,
        // companies,
        // tasks,
        // projects,
        invitationCode,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoFromToken = async (req, res) => {
  try {
    const { id, role } = req.auth;
    res.status(200).json({ id, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, invitationCode } = req.body;
    let role = req.body.role;
    let companyId = null;
    const userId = new mongoose.Types.ObjectId();

    if (role === "admin") {
      const beezNezCompany = await Company.findOne({ name: "BeeZnez" });
      if (!beezNezCompany) {
        return res.status(400).json({
          error:
            "Impossible de créer un administrateur BeeZnez car le compte entreprise BeeZnez n'a pas été créé.",
        });
      }
      companyId = beezNezCompany._id;
    }
    if (invitationCode) {
      const company = await Company.findOne({ invitationCode });
      if (!company) {
        return res.status(400).json({
          error: "Code d'invitation invalide.",
        });
      }
      if (company.name === "BeeZnez") role = "admin";
      else role = "employee";
      companyId = company._id;
    }

    const savedUser = await createUserFunction({
      _id: userId,
      firstName,
      lastName,
      email,
      password,
      role: role || "freelance",
      companyId,
    });

    const token = generateToken({
      id: userId,
      firstName,
      lastName,
      email,
      role,
    });

    res.cookie("token", token, cookieSettings);

    // const confirmationLink = `${process.env.FRONTEND_DOMAIN}/confirm-email?token=${token}`;
    // await sendConfirmationEmail(savedUser.email, token);

    res
      .status(201)
      .json({ message: "Compte créé avec succès", user: savedUser });
  } catch (error) {
    console.log("Erreur lors de la création du compte: ", error);
    const errors = getErrorMessages(error);
    res.status(500).json({
      errors,
      message: "Erreur lors de la création du compte",
    });
  }
};

const refreshToken = async (req, res) => {
  const oldToken = req.cookies.token;

  if (!oldToken) {
    return res.status(401).json({ error: "Token manquant" });
  }

  try {
    const { id, firstName, lastName, email, role } = decodeToken(oldToken);
    const newToken = generateToken({
      id,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      role,
    });

    res.cookie("token", newToken, cookieSettings);

    res.status(200).json({ message: "Token renouvelé avec succès" });
  } catch (error) {
    return res.status(403).json({ error: "Impossible de renouveler le token" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: authId, role: authRole } = req.auth;
    const { id } = req.params;
    if (authId !== id && authRole !== "admin") {
      return res.status(403).json({ error: "Accès non autorisé" });
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      profilePicture,
      dateOfBirth,
      address,
      oldPassword,
      role,
      newPassword,
    } = req.body;
    const newData = {};
    if (firstName) newData.firstName = firstName;
    if (lastName) newData.lastName = lastName;
    if (email) newData.email = email;
    if (phone) newData.phone = phone;
    if (profilePicture) newData.profilePicture = profilePicture;
    if (dateOfBirth) newData.dateOfBirth = dateOfBirth;
    if (address !== undefined && address !== null) newData.address = address;
    if (role && authRole === "admin") newData.role = role;
    if (newPassword && newPassword !== oldPassword) {
      const user = await User.findById(id);
      if (user) {
        const isMatch = await checkPassword(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({
            error: "Le nouveau mot de passe ne correspond pas à l'ancien",
          });
        }
        newData.password = newPassword;
      }
    }
    if (Object.keys(newData).length === 0) {
      return res.status(400).json({ message: "Aucun changement demandé" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...newData },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res
      .status(200)
      .json({ user: updatedUser, message: "Utilisateur mis à jour" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// À utiliser avec précaution, toujours avec le middleware verifyAdminToken
const changeUserPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: authId, role: authRole } = req.auth;
    const { id } = req.params;
    if (authId !== id && authRole !== "admin") {
      return res.status(403).json({ error: "Accès non autorisé" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  registerUser,
  login,
  updateUser,
  deleteUser,
  refreshToken,
  getUserInfoFromToken,
  changeUserPassword,
};
