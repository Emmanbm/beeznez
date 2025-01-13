const express = require("express");
const router = express.Router();

const {
  login,
  registerUser,
  getUserInfoFromToken,
  getUsers,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require("../controllers/userController");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdminToken = require("../middlewares/verifyAdminToken");
const { getStats } = require("../controllers/statsControllers");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/users", verifyToken, getUsers);
router.get("/getRole", verifyToken, getUserInfoFromToken);
router.put("/update/:id", verifyToken, updateUser);
router.get("/stats", verifyToken, getStats);
router.delete("/delete/user/:id", verifyAdminToken, deleteUser);
router.put("/change/user/password", verifyAdminToken, changeUserPassword);

module.exports = router;
