import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import {
  getPosts,
  myPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createComment,
  getCommentByPostAndId,
  updateCommentByPostAndId,
  deleteCommentByPostAndId,
  getPostsWithMostComments,
} from "../controllers/post.controllers.js";

const router = Router();

router.get("/post", getPosts);

router.get("/my-posts", authRequired, myPosts);

router.get("/post/:id", getPost);

router.post("/post", authRequired, createPost);

router.put("/post/:id", authRequired, updatePost);

router.delete("/post/:id", authRequired, deletePost);

//comentarios

router.get("/post/:postId/comments/:commentId", getCommentByPostAndId);

router.post("/post/:id/comments", authRequired, createComment);

router.put('/post/:postId/comments/:commentId', updateCommentByPostAndId);

router.delete("/post/:postId/comments/:commentId", authRequired, deleteCommentByPostAndId);

router.get('/post/featured-posts', getPostsWithMostComments);

export default router;
