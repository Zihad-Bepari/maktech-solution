import db from "../../database/db.js";

export const createBookingservice = async (userId, body) => {
  const { rental_space_id, start_date, end_date } = body;

  const result = await db.query(
    `INSERT INTO farm_bookings
     (rental_space_id, user_id, start_date, end_date, status)
     VALUES ($1,$2,$3,$4,'Booked') RETURNING *`,
    [rental_space_id, userId, start_date, end_date]
  );

  return result.rows[0];
};

export const getMyBookingsservice = async (userId) => {
  const result = await db.query(
    `SELECT * FROM farm_bookings WHERE user_id=$1 ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

export const updateBookingStatusservice = async (id, user, status) => {
  const allowed = ["Booked", "Cancelled", "Completed"];

  if (!allowed.includes(status)) throw new Error("Invalid status");
  if (!["Vendor", "Admin"].includes(user.role)) throw new Error("Not allowed");

  const result = await db.query(
    `UPDATE farm_bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );

  if (!result.rows.length) throw new Error("Not found");
  return result.rows[0];
};

export const cancelBookingservice = async (id, userId) => {
  const result = await db.query(
    `UPDATE farm_bookings SET status='Cancelled'
     WHERE id=$1 AND user_id=$2 RETURNING *`,
    [id, userId]
  );

  if (!result.rows.length) throw new Error("Cancel failed");
  return result.rows[0];
};