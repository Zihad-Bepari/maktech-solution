import db from "../../database/db.js";

export const createProductservice = async (userId, body) => {
  const {
    name,
    description,
    price,
    category,
    available_quantity
  } = body;

  const vendor = await db.query(
    "SELECT * FROM vendor_profiles WHERE user_id=$1",
    [userId]
  );

  if (vendor.rows.length === 0) {
    throw new Error("Vendor profile not found");
  }

  if (vendor.rows[0].certification_status !== "Approved") {
    throw new Error("Vendor not approved");
  }

  const vendorId = vendor.rows[0].id;

  const result = await db.query(
    `INSERT INTO produce
     (vendor_id, name, description, price, category, available_quantity)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [vendorId, name, description, price, category, available_quantity]
  );

  return result.rows[0];
};

export const getAllProductsservice = async () => {
  const result = await db.query(
    "SELECT * FROM produce WHERE deleted_at IS NULL"
  );
  return result.rows;
};

export const getSingleProductservice = async (id) => {
  const result = await db.query(
    "SELECT * FROM produce WHERE id=$1 AND deleted_at IS NULL",
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Product not found");
  }

  return result.rows[0];
};

export const updateProductservice = async (id, userId, body) => {
  const vendor = await db.query(
    "SELECT * FROM vendor_profiles WHERE user_id=$1",
    [userId]
  );

  if (vendor.rows.length === 0) {
    throw new Error("Vendor not found");
  }

  const vendorId = vendor.rows[0].id;

  const result = await db.query(
    `UPDATE produce
     SET name=$1,
         description=$2,
         price=$3,
         category=$4,
         available_quantity=$5
     WHERE id=$6 AND vendor_id=$7
     RETURNING *`,
    [
      body.name,
      body.description,
      body.price,
      body.category,
      body.available_quantity,
      id,
      vendorId
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Unauthorized or product not found");
  }

  return result.rows[0];
};

export const deleteProductservice   = async (id, userId) => {
  const vendor = await db.query(
    "SELECT * FROM vendor_profiles WHERE user_id=$1",
    [userId]
  );

  const vendorId = vendor.rows[0].id;

  const result = await db.query(
    `UPDATE produce
     SET deleted_at = NOW()
     WHERE id=$1 AND vendor_id=$2`,
    [id, vendorId]
  );

  if (result.rowCount === 0) {
    throw new Error("Delete failed");
  }
};