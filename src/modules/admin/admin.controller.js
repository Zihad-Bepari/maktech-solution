import { approveVendorservice, deleteVendorservice, getAllVendorsservice, getSingleVendorservice, rejectVendorservice } from "./admin.service.js";

// GET ALL
export const getAllVendors = async (req, res) => {
  try {
    const data = await getAllVendorsservice();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
export const getSingleVendor = async (req, res) => {
  try {
    const data = await getSingleVendorservice(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// APPROVE
export const approveVendor = async (req, res) => {
  try {
    const data = await approveVendorservice(req.params.id);

    res.json({
      success: true,
      message: "Vendor approved",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REJECT
export const rejectVendor = async (req, res) => {
  try {
    const data = await rejectVendorservice(req.params.id);

    res.json({
      success: true,
      message: "Vendor rejected",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteVendor = async (req, res) => {
  try {
    const data = await deleteVendorservice(req.params.id);

    res.json({
      success: true,
      message: "Vendor deleted",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};