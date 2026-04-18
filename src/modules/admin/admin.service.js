import db from "../../database/db.js";

// GET ALL
export const getAllVendorsservice = async () => {
  const [rows] = await db.execute(
    "SELECT * FROM vendors ORDER BY id DESC"
  );
  return rows;
};

// GET SINGLE
export const getSingleVendorservice = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM vendors WHERE id = ?",
    [id]
  );
  return rows[0];
};

// APPROVE
export const approveVendorservice = async (id) => {
  await db.execute(
    "UPDATE vendors SET status = 'approved' WHERE id = ?",
    [id]
  );
  return { id, status: "approved" };
};

// REJECT
export const rejectVendorservice = async (id) => {
  await db.execute(
    "UPDATE vendors SET status = 'rejected' WHERE id = ?",
    [id]
  );
  return { id, status: "rejected" };
};

// DELETE
export const deleteVendorservice = async (id) => {
  await db.execute(
    "DELETE FROM vendors WHERE id = ?",
    [id]
  );
  return { id };
};