import express from "express";
import { getOrderTracking, updateOrderStatus } from "./orderTracking.controller.js";
import { validateStatusUpdate } from "./orderTracking.validation.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/orders/:id/tracking", isAuthenticated, getOrderTracking);
router.patch("/orders/:id/status", isAuthenticated, validateStatusUpdate, updateOrderStatus);

export default router;