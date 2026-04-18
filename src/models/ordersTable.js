import database from "../database/db.js";

export const createOrderTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS orders (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE RESTRICT,

        total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,

        status VARCHAR(20) DEFAULT 'Pending'
          CHECK (status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')),

        payment_status VARCHAR(20) DEFAULT 'Unpaid'
          CHECK (payment_status IN ('Unpaid', 'Paid')),

        address TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await database.query(query);
  } catch (error) {
    console.error("Orders table error:", error);
  }
};