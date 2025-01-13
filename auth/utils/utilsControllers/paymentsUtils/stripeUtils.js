const Payment = require("../../../models/Payment");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Créer une intention de paiement
const createPaymentIntent = async (paymentData) => {
  const { amount, currency, payerId, recipientId, transactionId } = paymentData;

  try {
    // Validation des entrées
    if (!amount || !currency || !payerId || !recipientId || !transactionId) {
      return {
        status: 400,
        data: { error: "Données de paiement incomplètes." },
      };
    }

    // Créer une intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Montant en centimes
      currency: currency || "eur", // Par défaut, EUR
      metadata: {
        payerId,
        recipientId,
        transactionId,
      },
    });

    // Enregistrer la transaction dans MongoDB
    const payment = new Payment({
      payerId,
      recipientId,
      amount,
      status: "pending",
      method: "card",
    });
    await payment.save();
    return {
      status: 201,
      data: {
        clientSecret: paymentIntent.client_secret,
        message: "Intention de paiement créée avec succès.",
      },
    };

    // res.status(201).json({
    //   clientSecret: paymentIntent.client_secret,
    //   message: "Intention de paiement créée avec succès.",
    // });
  } catch (error) {
    throw error;
    // console.error(
    //   "Erreur lors de la création de l'intention de paiement :",
    //   error
    // );
    // res
    //   .status(500)
    //   .json({ error: "Erreur interne lors de la création du paiement." });
  }
};

// Capturer un paiement (webhook Stripe)
const capturePayment = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Vérifier la signature du webhook
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    console.error("Erreur de vérification du webhook Stripe :", error);
    return res.status(400).json({ error: "Webhook non valide." });
  }

  // Gestion des différents types d'événements
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      // Mettre à jour la transaction dans MongoDB
      await Payment.findOneAndUpdate(
        { transactionId: paymentIntent.metadata.transactionId },
        { status: "completed" }
      );

      console.log("Paiement réussi :", paymentIntent.id);
      res.status(200).json({ message: "Paiement capturé avec succès." });
      break;

    default:
      console.log(`Événement non géré : ${event.type}`);
      res.status(400).end();
  }
};

module.exports = {
  createPaymentIntent,
  capturePayment,
};
