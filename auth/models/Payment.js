const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  amount: { type: Number, required: true }, // Montant payé
  currency: { type: String, default: "EUR" }, // Devise
  transactionId: { type: String, required: true, unique: true }, // ID Stripe ou PayPal
  paymentMethod: { type: String }, // Méthode de paiement (PayPal, carte, etc.)
  status: {
    type: String,
    enum: ["success", "failed", "pending"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now }, // Date de création
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
