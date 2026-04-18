import database from "../database/db.js";

export async function createUserSettingsTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS user_settings (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                user_id UUID UNIQUE NOT NULL,
                email_notifications BOOLEAN DEFAULT FALSE,
                sms_notifications BOOLEAN DEFAULT FALSE,
                otp_code VARCHAR(6),              
                otp_expires TIMESTAMP,  
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `;
        await database.query(query);
    } catch (error) {
        console.error("Error creating user settings table:", error);
    }
}