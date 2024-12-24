const { decodeToken } = require("../utils/tokenUtils");

const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const user = decodeToken(token);
    if (user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        error: "Non autorisé",
        message: "Route reservée aux administrateurs",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({ error: "Non autorisé", message: "Token invalide ou expiré" });
  }
};

module.exports = verifyAdminToken;
