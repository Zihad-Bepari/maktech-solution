import express from "express";
import { isAuthenticated } from "../../middlewares/authMiddleware.js"; 
import { DeleteUser, GetProfile, Logout, turnOnEmailNotification, turnOnTwoFactorAuth, updatePassword } from "./user.controller.js";
import { validateUpdatePassword } from "./user.validation.js";
const router = express.Router();

router.put("/email-notification/on", isAuthenticated, turnOnEmailNotification);
router.put("/2FA/on", isAuthenticated, turnOnTwoFactorAuth);
router.put("/update", isAuthenticated, validateUpdatePassword, updatePassword);
router.delete("/delete", isAuthenticated, DeleteUser);
router.get("/profile",isAuthenticated, GetProfile);
router.get("/logout",isAuthenticated, Logout);
export default router;