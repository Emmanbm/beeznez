const Payment = require("../models/Payment");

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

module.exports = {
  calculateTotalPayments,
  calculatePaymentsPerMonth,
  deletePersonalData,
};
