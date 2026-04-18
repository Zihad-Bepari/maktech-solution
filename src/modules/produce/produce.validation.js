export const validateCreateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "name and price required"
    });
  }

  next();
};

export const validateUpdateProduct = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "At least one field required"
    });
  }

  next();
};