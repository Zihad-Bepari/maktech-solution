import { likePostservice } from "./community.service.js";
import { addCommentservice } from "./community.service.js";
import { getPostsservice } from "./community.service.js";
import { createPostservice } from "./community.service.js";

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const result = await createPostservice(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET POSTS
export const getPosts = async (req, res) => {
  try {
    const result = await getPostsservice();

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// COMMENT
export const addComment = async (req, res) => {
  try {
    const result = await addCommentservice(
      req.user.id,
      req.params.id,
      req.body.comment
    );

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LIKE
export const likePost = async (req, res) => {
  try {
    const result = await likePostservice(
      req.user.id,
      req.params.id
    );

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};