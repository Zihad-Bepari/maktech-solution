import { createRentalSpaceservice, deleteRentalSpaceservice, getAllRentalSpaceservice, getSingleRentalSpaceservice, updateRentalSpaceservice } from "./rentalSpace.service.js";

export const createRentalSpace = async (req, res) => {
  try {
    const data = await createRentalSpaceservice(req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllRentalSpaces = async (req, res) => {
  try {
    const data = await getAllRentalSpaceservice();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleRentalSpace = async (req, res) => {
  try {
    const data = await getSingleRentalSpaceservice(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateRentalSpace = async (req, res) => {
  try {
    const data = await updateRentalSpaceservice(
      req.params.id,
      req.user.id,
      req.body
    );
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRentalSpace = async (req, res) => {
  try {
    const data = await deleteRentalSpaceservice(req.params.id, req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};