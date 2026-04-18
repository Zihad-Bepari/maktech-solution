import ErrorHandler from "../../middlewares/errorMiddleware.js";

export const validateSignupData = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email  || !password || !confirmPassword) {
        return next(new ErrorHandler("All fields are required", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }
    if(password.length < 6){
        return next(new ErrorHandler("Password must be at least 6 characters", 400));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return next(new ErrorHandler("Invalid email address", 400));
    next();
}

export const validateSigninData = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Email and password are required", 400));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return next(new ErrorHandler("Invalid email address", 400));
    next();
}

export const validateResetPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  // Check if both fields exist
  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Both password and confirmPassword are required",
    });
  }

  // Check if they match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }

  // Check length
  if (password.length < 6 || password.length > 20) {
    return res.status(400).json({
      success: false,
      message: "Password must be between 6 and 20 characters",
    });
  }

  // All good
  next();
};

