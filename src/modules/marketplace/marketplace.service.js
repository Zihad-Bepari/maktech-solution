import db from "../../database/db.js";

// ALL PRODUCTS (ONLY APPROVED)
export const getAllProductsservice = async (query) => {
  const { category, minPrice, maxPrice } = query;

  let sql = `
    SELECT * FROM produce
    WHERE deleted_at IS NULL
  `;

  let params = [];

  // category filter
  if (category) {
    params.push(category);
    sql += ` AND category = $${params.length}`;
  }

  // price filters
  if (minPrice) {
    params.push(minPrice);
    sql += ` AND price >= $${params.length}`;
  }

  if (maxPrice) {
    params.push(maxPrice);
    sql += ` AND price <= $${params.length}`;
  }

  sql += ` ORDER BY created_at DESC`;

  const result = await db.query(sql, params);
  return result.rows;
};

// SINGLE PRODUCT
export const getProductByIdservice = async (id) => {
  const result = await db.query(
    `SELECT * FROM produce 
     WHERE id=$1 AND deleted_at IS NULL`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Product not found");
  }

  return result.rows[0];
};

// ALL VENDORS (ONLY APPROVED)
export const getAllVendorsservice = async () => {
  const result = await db.query(
    `SELECT vp.*, u.email
     FROM vendor_profiles vp
     JOIN users u ON vp.user_id = u.id
     WHERE vp.certification_status = 'Approved'`
  );

  return result.rows;
};