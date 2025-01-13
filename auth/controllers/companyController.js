const { default: mongoose } = require("mongoose");
const Company = require("../models/Company");
const User = require("../models/User");
const getErrorMessages = require("../utils/getErrorMessages");
// const sendConfirmationEmail = require("../utils/sendConfirmationEmail");
const {
  createCompanyFunction,
} = require("../utils/utilsControllers/companiesUtils");
const { createUserFunction } = require("../utils/utilsControllers/usersUtils");
const { generateToken } = require("../utils/tokenUtils");
const {
  createNotificationFunction,
} = require("../utils/utilsControllers/notificationsUtils");
const MAX_AGE = 24 * 60 * 60 * 1000; // 24 heures

const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company)
      return res.status(404).json({ message: "Société introuvable" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanies = async (_, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerCompany = async (req, res) => {
  try {
    const { name, email, phone, address, website, userId } = req.body;
    const companyId = new mongoose.Types.ObjectId();
    const savedCompany = await createCompanyFunction({
      _id: companyId,
      name,
      email,
      phone,
      address,
      website,
      employees: [userId],
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "manager", companyId },
      { new: true }
    );
    res.status(201).json({
      message: "Compte entreprise créé avec succès",
      company: savedCompany,
      user: updatedUser,
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

    const savedUser = await createUserFunction({
      firstName,
      lastName,
      email,
      password,
      role: "manager",
      companyId,
    });

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
    // console.log({ userData, companyData });

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
    const savedUser = await createUserFunction({
      _id: userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: companyData.name === "BeeZnez" ? "admin" : "manager",
      companyId,
    });
    const savedCompany = await createCompanyFunction({
      _id: companyId,
      name: companyData.name,
      email: companyData.email,
      phone: companyData.phone,
      address: companyData.address,
      website: companyData.website,
      employees: [userId],
    });
    const { firstName, lastName, email, role } = savedUser;
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

const joinCompanyByInvitation = async (req, res) => {
  try {
    const { invitationCode, userId } = req.body;

    const company = await Company.findOne({ invitationCode }).populate({
      path: "employees", // Le champ référencé dans la collection `Company`
      match: { role: "manager" }, // Ne récupérer que les utilisateurs dont le rôle est 'manager'
    });
    if (!company) {
      return res.status(400).json({ error: "Code d'invitation invalide." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ error: "Vous devez d'abord créer un compte" });
    }
    const managers = company.employees;
    await Promise.all(
      managers.map((manager) =>
        createNotificationFunction({
          userId: manager._id,
          title: "Nouvel utilisateur",
          message:
            "Un nouvel utilisateur a rejoint votre entreprise, vous pouvez consulter la liste des employés pour en savoir plus.",
        })
      )
    );

    company.employees.addToSet(userId);
    await company.save();

    await User.findOneAndUpdate(
      { _id: userId },
      {
        companyId: company._id,
        role: company.isTheMainCompany ? "admin" : "employee",
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Cet utilisateur a bien été ajouté à l'entreprise" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company)
      return res.status(404).json({ message: "Entreprise non trouvée" });
    res.status(200).json({ message: "Entreprise supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompany,
  getCompanies,
  deleteCompany,
  registerCompanyAndManager,
  registerCompany,
  registerCompanyManager,
  joinCompanyByInvitation,
};
