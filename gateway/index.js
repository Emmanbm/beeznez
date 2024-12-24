const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const proxy = require("express-http-proxy");
// const adminMiddleware = require("./app/middlewares/adminMiddlewares");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", proxy("http://auth:8081"));
// app.use("/api/companies", proxy("http://companies:8082"));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
