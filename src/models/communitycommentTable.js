import database from "../database/db.js";

// COMMENTS TABLE
export const createCommunityCommentTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS community_comments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE RESTRICT,
        comment TEXT NOT NULL,
        deleted_at TIMESTAMP DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Comments table error:", error);
  }
};
