import * as service from "./certification.service.js";
import { updateCertificationStatusservice } from "./certification.service.js";
import { getMyCertificationsservice } from "./certification.service.js";
import { createCertificationservice } from "./certification.service.js";

// CREATE
export const createCertification = async (req, res) => {
  try {
    const data = await createCertificationservice(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET MY CERTS
export const getMyCertifications = async (req, res) => {
  try {
    const data = await getMyCertificationsservice(req.user.id);

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS
export const updateCertificationStatus = async (req, res) => {
  try {
    const data = await updateCertificationStatusservice(
      req.params.id,
      req.user,
      req.body.status
    );

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};