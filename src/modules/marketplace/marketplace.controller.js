import { getAllVendorsservice } from "./marketplace.service.js";
import { getProductByIdservice } from "./marketplace.service.js";
import { getAllProductsservice } from "./marketplace.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await getAllProductsservice(req.query);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const result = await getProductByIdservice(req.params.id);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const result = await getAllVendorsservice();

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};