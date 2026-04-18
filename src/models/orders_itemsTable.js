import database from "../database/db.js";

export const createOrderItemsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS order_items (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        produce_id UUID REFERENCES produce(id) ON DELETE RESTRICT,
        vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE RESTRICT,

        quantity INT NOT NULL CHECK (quantity > 0),
        price NUMERIC(10,2) NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await database.query(query);
  } catch (error) {
    console.error("Order Items table error:", error);
  }
};