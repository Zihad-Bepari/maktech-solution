export const validateCreateCertification = (req, res, next) => {
  const { certifying_agency, certification_date } = req.body;

  if (!certifying_agency || !certification_date) {
    return res.status(400).json({
      message: "certifying_agency and certification_date required"
    });
  }

  next();
};

export const validateStatusUpdate = (req, res, next) => {
  const allowed = ["Pending", "Approved", "Rejected"];

  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  next();
};