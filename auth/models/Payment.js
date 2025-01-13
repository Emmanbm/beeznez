const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  payerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Utilisateur qui émet le paiement
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Utilisateur qui reçoit
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  amount: { type: Number, required: true }, // Montant payé
  currency: { type: String, default: "EUR" }, // Devise
  transactionId: { type: String, required: true, unique: true }, // ID Stripe ou PayPal
  paymentMethod: { type: String }, // Méthode de paiement (PayPal, carte, etc.)
  status: {
    type: String,
    enum: ["success", "failed", "pending", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now }, // Date de création
});

paymentSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
