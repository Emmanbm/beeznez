const {
  registerCompanyManager,
  registerCompanyAndManager,
  getCompanies,
  deleteCompany,
} = require("../controllers/companyController");
// const verifyAdminToken = require("../middlewares/verifyAdminToken");

const express = require("express");
const router = express.Router();

router.post("/register/manager", registerCompanyManager);
router.post("/register/company/and/manager", registerCompanyAndManager);
router.get("/companies", getCompanies);
// router.delete("/company/:id", verifyAdminToken, deleteCompany);
router.delete("/company/:id", deleteCompany);

module.exports = router;
