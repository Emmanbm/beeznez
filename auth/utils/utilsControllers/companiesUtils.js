const Company = require("../../models/Company");
const { getInvitationCode } = require("../getInvitationCode");

const createCompanyFunction = async (companyData) => {
  try {
    const { _id, name, email, phone, address, website, employees } =
      companyData;
    const newCompany = {
      name,
      email,
      phone,
      address,
      website,
      employees,
      invitationCode: getInvitationCode(),
    };
    if (_id) newCompany._id = _id;
    const company = new Company(newCompany);
    const savedCompany = await company.save();
    return savedCompany;
  } catch (error) {
    throw error;
  }
};

const getCompaniesFunction = async () => {
  try {
    const companies = await Company.find();
    return companies;
  } catch (error) {
    throw error;
  }
};

const getCompanyInvitationCode = async ({ role, companyId }) => {
  try {
    if (!["admin", "manager"].includes(role)) return null;
    const company = await Company.findById(companyId);
    return company.invitationCode;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCompanyFunction,
  getCompaniesFunction,
  getCompanyInvitationCode,
};
