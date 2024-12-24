const {
  getAdminStats,
  getManagerStats,
  getEmployeeStats,
} = require("../utils/getStats");

const getStats = async (req, res) => {
  try {
    const { userId, role, companyId } = req.query;
    // console.log(
    //   "UserId: ",
    //   userId,
    //   "\tRole: ",
    //   role,
    //   "\tCompanyId: ",
    //   companyId
    // );

    if (role === "admin") {
      const stats = await getAdminStats(userId);
      return res.status(200).json(stats);
    }
    if (role === "manager" && companyId) {
      const stats = await getManagerStats(userId, companyId);
      return res.status(200).json(stats);
    }
    if (role === "employee" || role === "freelance") {
      const stats = await getEmployeeStats(userId);
      return res.status(200).json(stats);
    }
    return res.status(404).json({ message: "Not Found !" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des statistiques" });
  }
};

module.exports = {
  getStats,
};
