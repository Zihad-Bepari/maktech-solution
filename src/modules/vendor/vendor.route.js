import express from "express";
import {
  applyVendor,
  getMyVendorProfile,
  updateVendorProfile
} from "./vendor.controller.js";

import { isAuthenticated } from "../../middlewares/authMiddleware.js"; 
import { validateVendorApply, validateVendorUpdate } from "./vendor.validation.js";

const router = express.Router();

router.post("/apply", isAuthenticated, validateVendorApply, applyVendor);
router.get("/profile", isAuthenticated, getMyVendorProfile);
router.put("/profile", isAuthenticated, validateVendorUpdate, updateVendorProfile);

export default router;