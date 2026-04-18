import express from "express";
import { createCertification, getMyCertifications, updateCertificationStatus } from "./certification.controller.js";
import { isAdmin, isAuthenticated } from "../../middlewares/authMiddleware.js";
import { validateCreateCertification, validateStatusUpdate } from "./certification.validation.js";
const router = express.Router();

// CREATE CERTIFICATION (vendor only)
router.post("/", isAuthenticated, validateCreateCertification, createCertification);

// GET MY CERTIFICATIONS
router.get("/", isAuthenticated, getMyCertifications);

// UPDATE STATUS (admin only)
router.patch("/:id/status", isAuthenticated,isAdmin, validateStatusUpdate, updateCertificationStatus);

export default router;