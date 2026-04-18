import database from '../../database/db.js';
import bcrypt from 'bcrypt';

export const userSettingsService = {
    // Email Notification
    turnOnEmail: async (userId) => {
        const query = `
            UPDATE user_settings
            SET email_notifications = TRUE,
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $1
            RETURNING *;
        `;
        const result = await database.query(query, [userId]);
        if (result.rows.length === 0) throw new Error("User settings not found");
        return result.rows[0];
    },

    // Two-Factor Authentication
    turnOn2FA: async (userId) => {
        const query = `
            UPDATE user_settings
            SET two_factor_auth = TRUE,
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $1
            RETURNING *;
        `;
        const result = await database.query(query, [userId]);
        if (result.rows.length === 0) throw new Error("User settings not found");
        return result.rows[0];
    }
};

export const updateUserPassword = async (user, currentPassword, newPassword) => {
  const isMatched = await bcrypt.compare(currentPassword, user.password);
  if (!isMatched) {
    throw new ErrorHandler("Current password is incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await database.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [hashedPassword, user.id]
  );

  return true;
};


export const deleteUserService = async (userId) => {
    const result = await database.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [userId]
    );    
     return result.rows.length > 0;
};
