const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const proxy = require("express-http-proxy");

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: process.env.FRONTEND_DOMAIN, credentials: true }));
// app.use("/api/auth", proxy("http://auth:8081"));
app.use("/api/auth", proxy(process.env.AUTH_DOMAIN));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
