import express from "express";
import { getAllProducts, getProductById, getAllVendors } from "./marketplace.controller.js";

const router = express.Router();

// PUBLIC SHOP
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/vendors", getAllVendors);

export default router;