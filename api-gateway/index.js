const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { FRONTEND_DOMAIN, AUTH_DOMAIN = "", PORT = 3000 } = process.env;

const expressProxy = require("express-http-proxy");
const proxyMiddleware = require("http-proxy-middleware");

const allowedOrigins = [
  FRONTEND_DOMAIN,
  "http://localhost:5173",
  "https://client-96400611877.europe-west1.run.app",
  "https://client-96400611877.europe-west9.run.app",
  "https://beeznez.fr",
  "https://www.beeznez.fr",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(
  "/auth-docs",
  proxyMiddleware.createProxyMiddleware({
    target: AUTH_DOMAIN + "/auth-docs",
    changeOrigin: true,
  })
);
app.use("/api/auth", expressProxy(AUTH_DOMAIN));
// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "img-src 'self' https://*.paypal.com https://googleads.g.doubleclick.net; " +
//       "script-src 'self' https://*.paypal.com; " +
//       "frame-src https://*.paypal.com;"
//   );
//   next();
// });

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
