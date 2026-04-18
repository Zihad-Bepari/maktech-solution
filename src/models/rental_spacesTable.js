import database from "../database/db.js";

export const createRentalSpaceTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS rental_spaces (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE RESTRICT,
        location TEXT,
        size VARCHAR(50),
        price DECIMAL(10,2),
        availability BOOLEAN DEFAULT TRUE,
        deleted_at TIMESTAMP DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Rental table error:", error);
  }
};