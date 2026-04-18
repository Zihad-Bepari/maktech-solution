import database from "../database/db.js";

export const createPlantTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS plants (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE RESTRICT,
        name VARCHAR(150),
        growth_stage VARCHAR(50),
        health_status VARCHAR(50),
        planted_date DATE,
        expected_harvest_date DATE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Plants table error:", error);
  }
};