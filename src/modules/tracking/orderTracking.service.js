import db from "../../database/db.js";

// GET TRACKING INFO
export const getOrderTrackingservice = async (orderId) => {
  const result = await db.query(
    `SELECT id, status, created_at, updated_at
     FROM orders
     WHERE id=$1`,
    [orderId]
  );

  if (result.rows.length === 0) {
    throw new Error("Order not found");
  }

  return result.rows[0];
};

// UPDATE STATUS
export const updateOrderStatusservice = async (orderId, user, status) => {
  const allowed = [
    "pending",
    "confirmed",
    "packed",
    "shipped",
    "delivered"
  ];

  if (!allowed.includes(status)) {
    throw new Error("Invalid status");
  }

  // OPTIONAL: role check
  if (!["Vendor", "Admin"].includes(user.role)) {
    throw new Error("Not authorized");
  }

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