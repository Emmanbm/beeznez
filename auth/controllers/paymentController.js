const Payment = require("../models/Payment");

const getPayments = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id: authId, role } = req.auth;
    let findObject = null;

    if (role === "admin") {
      findObject = {};
    } else {
      if (userId === authId) {
        findObject = {
          $or: [{ payerId: userId }, { recipientId: userId }],
        };
      }
    }
    if (findObject === null) {
      return res.status(403).json({ error: "Accès non autorisé" });
    }
    const payments = await Payment.find(findObject)
      .sort({ createdAt: -1 })
      .populate({
        path: "payerId recipientId",
        select: "firstName lastName email id",
      });
    return res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculateTotalPayments = async (req, res) => {
  try {
    const { companyId } = req.body;
    const total = await Payment.aggregate([
      { $match: { companyId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalAmount = total.length > 0 ? total[0].total : 0;
    return res.status(200).json(totalAmount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculatePaymentsPerMonth = async (req, res) => {
  try {
    const { companyId } = req.body;

    const paymentsPerMonth = await Payment.aggregate([
      { $match: { companyId } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalPayments: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return res.status(200).json(paymentsPerMonth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePersonalData = async (req, res) => {
  try {
    const { companyId } = req.body;

    await Payment.updateMany({ companyId }, { $unset: { companyId: "" } });
    return res
      .status(200)
      .json({ message: "Personal data was deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete personal data",
      error: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status = "success" } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  calculateTotalPayments,
  calculatePaymentsPerMonth,
  deletePersonalData,
  getPayments,
  updateStatus,
};
