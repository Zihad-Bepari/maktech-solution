import { updateOrderStatusservice } from "./order.service.js";
import { getOrderByIdservice } from "./order.service.js";
import { getMyOrdersservice } from "./order.service.js";
import { createOrderservice } from "./order.service.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await createOrderservice(userId, req.body);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const result = await getMyOrdersservice(req.user.id);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const result = await getOrderByIdservice(req.params.id);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const result = await updateOrderStatusservice(
      req.params.id,
      req.user.id,
      req.body.status
    );

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};