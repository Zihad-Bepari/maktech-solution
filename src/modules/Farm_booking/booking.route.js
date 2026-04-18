import express from "express";
import {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  cancelBooking
} from "./booking.controller.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

import { validateCreateBooking, validateStatusUpdate } from "./booking.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, validateCreateBooking, createBooking);
router.get("/", isAuthenticated, getMyBookings);
router.patch("/:id/status", isAuthenticated, validateStatusUpdate, updateBookingStatus);
router.patch("/:id/cancel", isAuthenticated, cancelBooking);

export default router;