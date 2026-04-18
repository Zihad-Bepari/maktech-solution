export const validateCreateOrder = (req, res, next) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({
      message: "product_id and quantity required"
    });
  }

  if (quantity <= 0) {
    return res.status(400).json({
      message: "quantity must be greater than 0"
    });
  }

  next();
};

export const validateUpdateStatus = (req, res, next) => {
  const { status } = req.body;

  const allowed = ["Pending", "Processing", "Completed", "Cancelled"];

  if (!allowed.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  next();
};