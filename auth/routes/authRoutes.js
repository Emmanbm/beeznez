const express = require("express");

const {
  login,
  registerUser,
  getUserInfoFromToken,
  getUsers,
  registerCompanyManager,
  updateUser,
  registerCompanyAndManager,
  registerCompany,
  deleteUser,
} = require("../controllers/userController");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdminToken = require("../middlewares/verifyAdminToken");
const { getCompanies } = require("../controllers/companyController");
const { getStats } = require("../controllers/statsControllers");

const router = express.Router();

router.get("/users", getUsers);
router.post("/register", registerUser);
router.post("/register/manager", registerCompanyManager);
router.post("/register/company/and/manager", registerCompanyAndManager);
router.post("/login", login);
router.get("/getRole", verifyToken, getUserInfoFromToken);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/user/:id", deleteUser);

router.get("/companies", getCompanies);
router.post("/register/company", registerCompany);

router.get("/stats", getStats);

module.exports = router;
