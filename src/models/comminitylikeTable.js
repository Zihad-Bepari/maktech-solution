import database from "../database/db.js";

// LIKES TABLE
export const createCommunityLikeTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS community_likes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE RESTRICT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(post_id, user_id)
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Likes table error:", error);
  }
};