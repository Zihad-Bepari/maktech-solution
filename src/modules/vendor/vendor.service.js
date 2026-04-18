import db from "../../database/db.js";

// APPLY VENDOR
export const applyVendorservice = async (userId, body) => {
  const { farm_name, farm_location } = body;

  // check already exists
  const existing = await db.query(
    "SELECT * FROM vendor_profiles WHERE user_id=$1",
    [userId]
  );

  if (existing.rows.length > 0) {
    throw new Error("Vendor request already exists");
  }

  const result = await db.query(
    `INSERT INTO vendor_profiles (user_id, farm_name, farm_location, certification_status)
     VALUES ($1, $2, $3, 'Pending')
     RETURNING *`,
    [userId, farm_name, farm_location]
  );

  return result.rows[0];
};

// GET PROFILE
export const getMyVendorProfileservice = async (userId) => {
  const result = await db.query(
    "SELECT * FROM vendor_profiles WHERE user_id=$1",
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error("Vendor profile not found");
  }

  return result.rows[0];
};

// UPDATE PROFILE
export const updateVendorProfileservice = async (userId, body) => {
  const { farm_name, farm_location } = body;

  const result = await db.query(
    `UPDATE vendor_profiles
     SET farm_name=$1,
         farm_location=$2
     WHERE user_id=$3
     RETURNING *`,
    [farm_name, farm_location, userId]
  );

  if (result.rows.length === 0) {
    throw new Error("Vendor profile not found");
  }

  return result.rows[0];
};