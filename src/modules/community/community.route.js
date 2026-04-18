import express from "express";
import { createPost, getPosts, addComment, likePost } from "./community.controller.js";
import { validateComment, validatePost } from "./community.validation.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// POSTS
router.post("/posts", isAuthenticated, validatePost, createPost);
router.get("/posts", getPosts);

// COMMENTS
router.post("/posts/:id/comment", isAuthenticated, validateComment, addComment);

// LIKE
router.post("/posts/:id/like", isAuthenticated, likePost);

export default router;