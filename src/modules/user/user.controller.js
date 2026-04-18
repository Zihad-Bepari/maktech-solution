import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { deleteUserService, updateUserPassword, userSettingsService } from "./user.service.js";

// Email Notification
export const turnOnEmailNotification = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const updatedSettings = await userSettingsService.turnOnEmail(userId);

    res.status(200).json({
        success: true,
        message: "Email notification turned ON successfully",
        settings: updatedSettings
    });
});




// Two-Factor Authentication
export const turnOnTwoFactorAuth = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const updatedSettings = await userSettingsService.turnOn2FA(userId);

    res.status(200).json({
        success: true,
        message: "Two-factor authentication turned ON successfully",
        settings: updatedSettings
    });
});

export const GetProfile = catchAsyncError(async (req, res, next) => {
      const user = req.user

      res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user
      });
});

export const Logout = catchAsyncError(async (req, res, next) => {
     res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "User logged out successfully"
    });
});

export const updatePassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  await updateUserPassword(req.user, currentPassword, newPassword);

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});


export const DeleteUser = catchAsyncError(async (req, res, next) => {
        const userId = req.user.id; 

        const deleted = await deleteUserService(userId);


        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Your account has been permanently deleted.",
        });
});