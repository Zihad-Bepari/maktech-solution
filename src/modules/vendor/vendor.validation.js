export const validateVendorApply = (req, res, next) => {
  const { farm_name, farm_location } = req.body;

  if (!farm_name || !farm_location) {
    return res.status(400).json({
      success: false,
      message: "farm_name and farm_location are required"
    });
  }

  next();
};

export const validateVendorUpdate = (req, res, next) => {
  const { farm_name, farm_location } = req.body;

  if (!farm_name && !farm_location) {
    return res.status(400).json({
      success: false,
      message: "At least one field required to update"
    });
  }

  next();
};