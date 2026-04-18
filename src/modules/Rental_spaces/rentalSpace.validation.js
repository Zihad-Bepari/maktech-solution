export const validateCreateRentalSpace = (req, res, next) => {
  const { location, size, price } = req.body;

  if (!location || !size || !price) {
    return res.status(400).json({
      message: "location, size, price required"
    });
  }

  next();
};

export const validateUpdateRentalSpace = (req, res, next) => {
  next();
};