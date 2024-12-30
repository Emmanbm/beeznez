const express = require("express");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const companyRouter = require("./routes/companyRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const taskRouter = require("./routes/taskRoutes");
const projectRouter = require("./routes/projectRoutes");

const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middlewares/verifyToken");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", companyRouter);
app.use("/", verifyToken, taskRouter);
app.use("/", verifyToken, projectRouter);
app.use("/", verifyToken, notificationRouter);
app.use((req, res) => {
  res.status(404).json({
    message: `La page '${req.url}' n'existe pas, veuillez vérifier l'URL`,
  });
});

server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = server;
