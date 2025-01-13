const express = require("express");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const companyRouter = require("./routes/companyRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const taskRouter = require("./routes/taskRoutes");
const projectRouter = require("./routes/projectRoutes");
const paymentRouter = require("./routes/paymentRoutes");

const { connectDB } = require("./config/db");
const { swaggerUi, swaggerSpec } = require("./config/swaggerConfig");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middlewares/verifyToken");

const app = express();
const PORT = process.env.PORT;

connectDB();
// http://localhost:3000/auth-docs

app.use(express.json());
app.use(cookieParser());
app.use("/auth-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", authRouter);
app.use("/", companyRouter);
app.use("/", paymentRouter);
app.use("/", notificationRouter);
app.use("/", verifyToken, taskRouter);
app.use("/", verifyToken, projectRouter);
app.use((req, res) => {
  res.status(404).json({
    message: `La route '${req.url}' n'existe pas en methode ${req.method}, veuillez vérifier l'URL`,
  });
});

server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = server;
