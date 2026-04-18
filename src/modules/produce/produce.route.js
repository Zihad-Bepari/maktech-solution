import express from "express";
import { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } from "./produce.controller.js";
import { validateCreateProduct, validateUpdateProduct } from "./produce.validation.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/products", isAuthenticated, validateCreateProduct, createProduct);

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.put("/products/:id", isAuthenticated, validateUpdateProduct, updateProduct);
router.delete("/products/:id", isAuthenticated, deleteProduct);

export default router;