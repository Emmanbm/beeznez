const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload, expiresIn = "24h") {
  try {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
    return token;
  } catch (error) {
    console.error("Erreur lors de la génération du token:", error);
    throw error;
  }
}

function decodeToken(token) {
  try {
    const payload = jwt.decode(token, SECRET_KEY);
    return payload;
  } catch (error) {
    console.error("Erreur lors du décodage du token: ", error);
    throw error;
  }
}

module.exports = { generateToken, decodeToken };
