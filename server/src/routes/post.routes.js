import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import {
  getPosts,
  myPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  reportPost,
  createComment,
  // getCommentByPostAndId,
  // updateCommentByPostAndId,
  // deleteCommentByPostAndId,
  getPostsWithMostComments,
  searchQuery,
} from "../controllers/post.controllers.js";

const router = Router();

router.get("/posts", getPosts);

router.get("/post/:id", getPost);

router.get("/my-posts", authRequired, myPosts);

router.post("/post", authRequired, createPost);

router.put("/post/:id", authRequired, updatePost);

router.delete("/post/:id", authRequired, deletePost);

router.post('/report/:id', reportPost);

//comentarios

router.post("/post/:id/comments", authRequired, createComment);

// router.put('/post/:postId/comments/:commentId', updateCommentByPostAndId);

// router.delete("/post/:postId/comments/:commentId", authRequired, deleteCommentByPostAndId);

router.get('/post-featured', getPostsWithMostComments);

router.get('/search', searchQuery)

export default router;
