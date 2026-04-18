import { updateProductservice } from "./produce.service.js";
import { deleteProductservice } from "./produce.service.js";
import { getSingleProductservice } from "./produce.service.js";
import { getAllProductsservice } from "./produce.service.js";
import { createProductservice } from "./produce.service.js";

export const createProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await createProductservice(userId, req.body);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await getAllProductsservice();
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const result = await getSingleProductservice(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const result = await updateProductservice(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await deleteProductservice(req.params.id, req.user.id);

    res.json({
      success: true,
      message: "Product deleted"
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};