import database from "../database/db.js";

export const createVendorTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS vendor_profiles (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID UNIQUE REFERENCES users(id) ON DELETE RESTRICT,
        farm_name VARCHAR(150),
        certification_status VARCHAR(20) DEFAULT 'Pending'
          CHECK (certification_status IN ('Pending', 'Approved', 'Rejected')),
        farm_location TEXT,
        deleted_at TIMESTAMP DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Vendor table error:", error);
  }
};