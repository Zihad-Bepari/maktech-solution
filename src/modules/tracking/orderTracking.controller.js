import { updateOrderStatusservice } from "./orderTracking.service.js";
import { getOrderTrackingservice } from "./orderTracking.service.js";

export const getOrderTracking = async (req, res) => {
  try {
    const result = await getOrderTrackingservice(req.params.id);

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
      req.user,
      req.body.status
    );

    res.json({
      success: true,
      message: "Order status updated",
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};