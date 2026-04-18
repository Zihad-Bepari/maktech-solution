import database from "../database/db.js";

export const createBookingTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS farm_bookings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        rental_space_id UUID REFERENCES rental_spaces(id) ON DELETE RESTRICT,
        user_id UUID REFERENCES users(id) ON DELETE RESTRICT,
        start_date DATE,
        end_date DATE,
        status VARCHAR(20) DEFAULT 'Booked'
          CHECK (status IN ('Booked', 'Cancelled', 'Completed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Bookings table error:", error);
  }
};