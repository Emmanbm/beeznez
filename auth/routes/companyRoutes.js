const {
  registerCompanyManager,
  registerCompanyAndManager,
  getCompanies,
  deleteCompany,
  registerCompany,
  getCompany,
  joinCompanyByInvitation,
} = require("../controllers/companyController");
const verifyAdminToken = require("../middlewares/verifyAdminToken");

const express = require("express");
const router = express.Router();

router.post("/register/manager", registerCompanyManager);
router.post("/register/company/and/manager", registerCompanyAndManager);
router.post("/register/company", registerCompany);
router.post("/join/company", joinCompanyByInvitation);
router.get("/company/:id", getCompany);
router.get("/companies", verifyAdminToken, getCompanies);
router.delete("/company/:id", verifyAdminToken, deleteCompany);

module.exports = router;
