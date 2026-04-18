import ErrorHandler from "../../middlewares/errorMiddleware.js";


export const validateUpdatePassword = (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide current password, new password and confirm password",
    });
  }

  if (newPassword.length < 6 || newPassword.length > 20) {
    return res.status(400).json({
      success: false,
      message: "New password must be between 6 and 20 characters",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match",
    });
  }

  next();
};