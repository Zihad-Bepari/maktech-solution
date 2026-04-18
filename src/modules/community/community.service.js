import db from "../../database/db.js";

// CREATE POST
export const createPostservice = async (userId, body) => {
  const result = await db.query(
    `INSERT INTO community_posts (user_id, post_content)
     VALUES ($1,$2)
     RETURNING *`,
    [userId, body.post_content]
  );

  return result.rows[0];
};

// GET POSTS
export const getPostsservice = async () => {
  const result = await db.query(
    `SELECT * FROM community_posts
     WHERE deleted_at IS NULL
     ORDER BY post_date DESC`
  );

  return result.rows;
};

// ADD COMMENT
export const addCommentservice = async (userId, postId, comment) => {
  const result = await db.query(
    `INSERT INTO comments (user_id, post_id, comment)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [userId, postId, comment]
  );

  return result.rows[0];
};

// LIKE POST (toggle system)
export const likePostservice = async (userId, postId) => {
  const existing = await db.query(
    `SELECT * FROM likes WHERE user_id=$1 AND post_id=$2`,
    [userId, postId]
  );

  if (existing.rows.length > 0) {
    await db.query(
      `DELETE FROM likes WHERE user_id=$1 AND post_id=$2`,
      [userId, postId]
    );

    return { message: "Unliked" };
  }

  const result = await db.query(
    `INSERT INTO likes (user_id, post_id)
     VALUES ($1,$2)
     RETURNING *`,
    [userId, postId]
  );

  return { message: "Liked", data: result.rows[0] };
};