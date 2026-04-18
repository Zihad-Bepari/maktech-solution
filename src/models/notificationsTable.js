import database from "../database/db.js";

export const createNotificationTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE RESTRICT,
        message TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Notification table error:", error);
  }
};