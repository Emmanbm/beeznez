const paypalClient = require("../config/paypalConfig");
const paypal = require("@paypal/checkout-server-sdk");
const Payment = require("../models/Payment");
const User = require("../models/User");
const {
  createNotificationFunction,
} = require("../utils/utilsControllers/notificationsUtils");

const { FRONTEND_DOMAIN } = process.env;

const createPayment = async (req, res) => {
  const {
    payerId,
    recipientEmail,
    recipientId,
    amount,
    currency = "EUR",
    description,
  } = req.body;

  if (!payerId || !(recipientEmail || recipientId) || !amount) {
    return res.status(400).json({ error: "Paramètres manquants" });
  }

  let recipient = null;
  if (recipientId) {
    recipient = await User.findById(recipientId);
  } else {
    recipient = await User.findOne({ email: recipientEmail });
  }
  if (!recipient) {
    return res.status(400).json({ error: "Utilisateur non trouvé" });
  }

  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          payee: {
            email_address: recipient.email, // Adresse email du destinataire
          },
          description: description || "Paiement via BeeZnez",
        },
      ],
      application_context: {
        brand_name: "BeeZnez",
        landing_page: "LOGIN", // L'utilisateur doit se connecter à PayPal
        user_action: "PAY_NOW", // Encourage l'utilisateur à payer immédiatement
        return_url: `${FRONTEND_DOMAIN}/auth/payments/paypal/success`, // URL de succès
        cancel_url: `${FRONTEND_DOMAIN}/auth/payments/paypal/cancel`, // URL d'annulation
      },
    });

    // Exécutez la requête vers PayPal
    const order = await paypalClient.execute(request);
    const orderId = order.result.id;

    // Enregistrer la transaction dans MongoDB
    const payment = new Payment({
      payerId,
      recipientId: recipient.id,
      amount,
      currency,
      status: "pending",
      transactionId: orderId,
    });
    await payment.save();

    // Réponse avec l'ID de commande et le lien d'approbation
    res.status(201).json({
      orderId,
      approvalLink: order.result.links.find((link) => link.rel === "approve")
        .href,
    });
  } catch (error) {
    console.error("Erreur lors de la création du paiement :", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors de la création du paiement." });
  }
};

const capturePayment = async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "ID de commande manquant." });
  }

  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({}); // Corps vide requis pour capturer

    // Capturer le paiement
    const capture = await paypalClient.execute(request);

    // Mettre à jour le statut du paiement dans la base de données
    const payment = await Payment.findOneAndUpdate(
      { transactionId: orderId },
      { status: "success" },
      { new: true }
    ).populate({
      path: "payerId recipientId",
      select: "firstName lastName email id",
    });

    if (!payment) {
      return res.status(404).json({ error: "Paiement non trouvé." });
    }
    await Promise.all([
      createNotificationFunction({
        userId: payment.payerId.id,
        title: "Votre paiement a bien été effectué",
        type: "success",
        message: `Félicitation, vous avez effectué un paiement de ${payment.amount} ${payment.currency} à ${payment.recipientId.firstName} ${payment.recipientId.lastName}.`,
      }),
      createNotificationFunction({
        userId: payment.recipientId.id,
        title: "Vous venez de recevoir un paiement",
        type: "success",
        message: `Félicitation, vous avez reçu un paiement de ${payment.amount} ${payment.currency} de la part de ${payment.payerId.firstName} ${payment.payerId.lastName}.`,
      }),
    ]);

    res.status(200).json({
      message: "Paiement capturé avec succès.",
      payment,
      details: capture.result,
    });
  } catch (error) {
    console.error("Erreur lors de la capture du paiement :", error);

    // Mettre à jour le statut du paiement en cas d'erreur
    const payment = await Payment.findOneAndUpdate(
      { transactionId: orderId },
      { status: "failed" }
    ).populate("payerId recipientId");
    if (!payment) {
      return res.status(404).json({ error: "Paiement non trouvé." });
    }

    await createNotificationFunction({
      userId: payment.payerId.id,
      title: "Votre paiement n'a pas été effectué",
      type: "error",
      message: `Une erreur est survenue lors de votre paiement de ${payment.amount} ${payment.currency} à ${payment.recipientId.firstName} ${payment.recipientId.lastName}.`,
    });

    res.status(500).json({ error: "Erreur lors de la capture du paiement." });
  }
};

module.exports = { createPayment, capturePayment };
