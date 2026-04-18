import db from "../../database/db.js";

export const createRentalSpaceservice = async (vendorId, body) => {
  const { location, size, price } = body;

  const result = await db.query(
    `INSERT INTO rental_spaces (vendor_id, location, size, price)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [vendorId, location, size, price]
  );

  return result.rows[0];
};

export const getAllRentalSpaceservice = async () => {
  const result = await db.query(
    `SELECT * FROM rental_spaces WHERE deleted_at IS NULL`
  );
  return result.rows;
};

export const getSingleRentalSpaceservice = async (id) => {
  const result = await db.query(
    `SELECT * FROM rental_spaces WHERE id=$1 AND deleted_at IS NULL`,
    [id]
  );

  if (!result.rows.length) throw new Error("Not found");
  return result.rows[0];
};

export const updateRentalSpaceservice = async (id, vendorId, body) => {
  const { location, size, price, availability } = body;

  const result = await db.query(
    `UPDATE rental_spaces
     SET location = COALESCE($1, location),
         size = COALESCE($2, size),
         price = COALESCE($3, price),
         availability = COALESCE($4, availability)
     WHERE id=$5 AND vendor_id=$6
     RETURNING *`,
    [location, size, price, availability, id, vendorId]
  );

  if (!result.rows.length) throw new Error("Update failed");
  return result.rows[0];
};

export const deleteRentalSpaceservice = async (id, vendorId) => {
  const result = await db.query(
    `UPDATE rental_spaces SET deleted_at = NOW()
     WHERE id=$1 AND vendor_id=$2 RETURNING *`,
    [id, vendorId]
  );

  if (!result.rows.length) throw new Error("Delete failed");
  return result.rows[0];
};