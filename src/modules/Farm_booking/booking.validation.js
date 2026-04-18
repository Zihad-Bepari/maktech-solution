export const validateCreateBooking = (req, res, next) => {
  const { rental_space_id, start_date, end_date } = req.body;

  if (!rental_space_id || !start_date || !end_date) {
    return res.status(400).json({
      message: "All fields required"
    });
  }

  next();
};

export const validateStatusUpdate = (req, res, next) => {
  const allowed = ["Booked", "Cancelled", "Completed"];

  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  next();
};