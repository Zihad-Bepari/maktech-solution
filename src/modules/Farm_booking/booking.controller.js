import { createBookingservice } from "./booking.service.js";
import { getMyBookingsservice } from "./booking.service.js";
import { updateBookingStatusservice } from "./booking.service.js";
import { cancelBookingservice } from "./booking.service.js";

export const createBooking = async (req, res) => {
  try {
    const data = await createBookingservice(req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const data = await getMyBookingsservice(req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const data = await updateBookingStatusservice(
      req.params.id,
      req.user,
      req.body.status
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const data = await cancelBookingservice(req.params.id, req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};