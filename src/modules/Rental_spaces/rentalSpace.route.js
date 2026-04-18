import express from "express";
import {
  createRentalSpace,
  getAllRentalSpaces,
  getSingleRentalSpace,
  updateRentalSpace,
  deleteRentalSpace
} from "./rentalSpace.controller.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import {
  validateCreateRentalSpace,
  validateUpdateRentalSpace
} from "./rentalSpace.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, validateCreateRentalSpace, createRentalSpace);
router.get("/", getAllRentalSpaces);
router.get("/:id", getSingleRentalSpace);
router.patch("/:id", isAuthenticated, validateUpdateRentalSpace, updateRentalSpace);
router.delete("/:id", isAuthenticated, deleteRentalSpace);

export default router;