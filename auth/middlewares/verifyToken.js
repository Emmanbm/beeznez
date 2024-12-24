const { decodeToken } = require("../utils/tokenUtils");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const user = decodeToken(token);
    req.auth = {
      id: user.id,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({ error: "Non autorisé", message: "Token invalide ou expiré" });
  }
};

module.exports = verifyToken;
