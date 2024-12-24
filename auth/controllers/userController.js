const { default: mongoose } = require("mongoose");
const Company = require("../models/Company");
const Notification = require("../models/Notification");
const User = require("../models/User");
const getErrorMessages = require("../utils/getErrorMessages");
const { checkPassword } = require("../utils/passwordUtils");
const { generateToken, decodeToken } = require("../utils/tokenUtils");
const { getInvitationCode } = require("../utils/getInvitationCode");
const sendConfirmationEmail = require("../utils/sendConfirmationEmail");
const { getAllUsers, getEmployees } = require("../utils/getUsers");

const MAX_AGE = 24 * 60 * 60 * 1000; // 24 heures

const getUsers = async (req, res) => {
  try {
    const { role, companyId } = req.query;
    if (role === "admin") {
      const users = await getAllUsers();
      return res.status(200).json(users);
    }
    if (role === "manager") {
      const users = await getEmployees(companyId);
      return res.status(200).json(users);
    }
    return res.status(200).json([]);
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

    const {
      _id: id,
      firstName,
      lastName,
      email,
      role,
      profilePicture,
      companyId,
    } = user;

    const notifications = await Notification.find({ userId: id }).sort({
      createdAt: -1,
    });

    const token = generateToken({
      id,
      firstName,
      lastName,
      email,
      role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: MAX_AGE,
    });
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
    const { firstName, lastName, email, password, role } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || "freelance",
    });

    const savedUser = await user.save();
    const token = generateToken({
      id: user._id,
      firstName,
      lastName,
      email,
      role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: MAX_AGE,
    });

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

const registerCompany = async (req, res) => {
  try {
    const { name, email, phone, address, website } = req.body;
    const company = new Company({
      name,
      email,
      phone,
      address,
      website,
    });
    const savedCompany = await company.save();
    res.status(201).json({
      message: "Compte entreprise créé avec succès",
      company: savedCompany,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création du compte entreprise",
    });
  }
};

const registerCompanyManager = async (req, res) => {
  try {
    const { firstName, lastName, email, password, companyId } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role: "manager",
      companyId,
    });

    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "Compte admin créé avec succès", user: savedUser });
  } catch (error) {
    console.log("Erreur lors de la création du compte administrateur: ", error);
    res.status(500).json({ error: "Erreur lors de la création du compte" });
  }
};

const registerCompanyAndManager = async (req, res) => {
  try {
    const { userData, companyData } = req.body;

    const companyExists = await Company.findOne({ email: companyData.email });
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      return res.status(400).json({
        error: "Email déjà utilisé pour un utilisateur.",
      });
    }
    if (companyExists) {
      return res.status(400).json({
        error: "Email déjà utilisé pour une entreprise.",
      });
    }

    const companyId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    const manager = new User({
      _id: userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: "manager",
      companyId,
    });
    const savedUser = await manager.save();

    const company = new Company({
      _id: companyId,
      name: companyData.name,
      email: companyData.email,
      phone: companyData.phone,
      address: companyData.address,
      website: companyData.website,
      employees: [userId],
      invitationCode: getInvitationCode(),
    });
    const savedCompany = await company.save();
    const token = generateToken({
      id: userId,
      firstName,
      lastName,
      email,
      role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: MAX_AGE,
    });

    // const confirmationLink = `${process.env.FRONTEND_DOMAIN}/confirm-email?token=${token}`;
    // await sendConfirmationEmail(savedUser.email, token);
    // await sendConfirmationEmail(savedCompany.email, token);

    return res.status(201).json({ company: savedCompany, user: savedUser });
  } catch (error) {
    console.log(
      "Erreur lors de la création de l'entreprise et du chef d'entreprise: ",
      error
    );
    const errors = getErrorMessages(error);
    res.status(500).json({
      errors,
      message:
        "Erreur lors de la création de l'entreprise et du chef d'entreprise",
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

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: MAX_AGE,
    });

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
      const user = User.findOne(id);
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
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res
      .status(200)
      .json({ user: updatedUser, message: "Utilisateur mis à jour" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    // const { id: authId, role: authRole } = req.auth;
    const { id } = req.params;
    // if (authId !== id && authRole !== "admin") {
    //   return res.status(403).json({ error: "Accès non autorisé" });
    // }

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
  registerCompany,
  registerCompanyManager,
  registerCompanyAndManager,
  login,
  updateUser,
  deleteUser,
  refreshToken,
  getUserInfoFromToken,
};
