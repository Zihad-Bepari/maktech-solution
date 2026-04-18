const allowedStatus = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered"
];

export const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "status is required"
    });
  }

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value"
    });
  }

  next();
};