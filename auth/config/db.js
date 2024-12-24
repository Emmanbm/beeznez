const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DATABASE_URI = process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("User DB Connected");
  } catch (error) {
    console.error("User DB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
