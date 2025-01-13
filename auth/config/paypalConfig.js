const paypal = require("@paypal/checkout-server-sdk");

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET, NODE_ENV } = process.env;

let environment;
if (NODE_ENV === "production") {
  environment = new paypal.core.LiveEnvironment(
    PAYPAL_CLIENT_ID,
    PAYPAL_SECRET
  );
} else {
  environment = new paypal.core.SandboxEnvironment(
    PAYPAL_CLIENT_ID,
    PAYPAL_SECRET
  );
}
const paypalClient = new paypal.core.PayPalHttpClient(environment);

module.exports = paypalClient;
