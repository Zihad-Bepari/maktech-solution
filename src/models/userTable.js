import database from "../database/db.js";

export const createUserTable = async () => {
     try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                name Varchar(155) NOT NULL CHECK (char_length(name) >= 3),
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(10) NOT NULL DEFAULT 'Customer' CHECK (role IN ('Customer', 'Admin', 'Vendor')),
                profile_image_url JSONB DEFAULT NULL,
                phpone VARCHAR(15) DEFAULT NULL,
                status VARCHAR(20) NOT NULL DEFAULT 'Inactive' CHECK (status IN ('Active', 'Inactive')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await database.query(query);
     } catch (error) {
        console.error("Error creating users table:", error);
     }  
};