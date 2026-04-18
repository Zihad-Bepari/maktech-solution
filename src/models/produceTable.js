import database from "../database/db.js";

export const createProduceTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS produce (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE RESTRICT,
        name VARCHAR(150),
        description TEXT,
        price DECIMAL(10,2),
        category VARCHAR(100),
        certification_status VARCHAR(20) DEFAULT 'Pending'
          CHECK (certification_status IN ('Pending', 'Approved', 'Rejected')),
        available_quantity INT DEFAULT 0,
        deleted_at TIMESTAMP DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Produce table error:", error);
  }
};