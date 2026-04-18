import { applyVendorservice, getMyVendorProfileservice, updateVendorProfileservice } from "./vendor.service.js"; 

export const applyVendor = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await  applyVendorservice(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Vendor application submitted",
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const getMyVendorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await getMyVendorProfileservice(userId);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const updateVendorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await updateVendorProfileservice(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Vendor profile updated",
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};