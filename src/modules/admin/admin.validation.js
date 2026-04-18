export const validateVendorId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Valid vendor id required",
    });
  }

  next();
};