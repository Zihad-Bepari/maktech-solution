import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus
} from "./order.controller.js";

import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { validateCreateOrder, validateUpdateStatus } from "./order.validation.js";


const router = express.Router();

router.post("/", isAuthenticated, validateCreateOrder, createOrder);
router.get("/", isAuthenticated, getMyOrders);
router.get("/:id", isAuthenticated, getOrderById);
router.put("/:id/status", isAuthenticated, validateUpdateStatus, updateOrderStatus);

export default router;