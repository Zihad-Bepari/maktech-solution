import db from "../../database/db.js";

// CREATE ORDER
export const createOrderservice = async (userId, body) => {
  const { product_id, quantity } = body;

  // get product
  const product = await db.query(
    "SELECT * FROM produce WHERE id=$1 AND deleted_at IS NULL",
    [product_id]
  );

  if (product.rows.length === 0) {
    throw new Error("Product not found");
  }

  const price = product.rows[0].price;
  const total_price = price * quantity;

  const result = await db.query(
    `INSERT INTO orders (user_id, product_id, quantity, total_price, status)
     VALUES ($1,$2,$3,$4,'Pending')
     RETURNING *`,
    [userId, product_id, quantity, total_price]
  );

  return result.rows[0];
};

// GET MY ORDERS
export const getMyOrdersservice = async (userId) => {
  const result = await db.query(
    "SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC",
    [userId]
  );

  return result.rows;
};

// GET SINGLE ORDER
export const getOrderByIdservice = async (id) => {
  const result = await db.query(
    "SELECT * FROM orders WHERE id=$1",
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Order not found");
  }

  return result.rows[0];
};

// UPDATE STATUS
export const updateOrderStatusservice = async (orderId, userId, status) => {
  const result = await db.query(
    `UPDATE orders
     SET status=$1
     WHERE id=$2
     RETURNING *`,
    [status, orderId]
  );

  if (result.rows.length === 0) {
    throw new Error("Order not found");
  }

  return result.rows[0];
};