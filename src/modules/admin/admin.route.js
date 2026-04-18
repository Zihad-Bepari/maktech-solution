import express from "express";
import { validateVendorId } from "./admin.validation.js";
import { isAdmin } from "../../middlewares/authMiddleware.js";
import { approveVendor, getAllVendors, getSingleVendor, rejectVendor, deleteVendor } from "./admin.controller.js";
const router = express.Router();

router.get("/vendors", isAdmin, getAllVendors);
router.get("/vendors/:id",isAdmin,validateVendorId,getSingleVendor);
router.patch("/vendors/:id/approve",isAdmin,validateVendorId,approveVendor);
router.patch("/vendors/:id/reject", isAdmin,validateVendorId,rejectVendor);
router.delete("/vendors/:id",isAdmin,validateVendorId,deleteVendor);

export default router;