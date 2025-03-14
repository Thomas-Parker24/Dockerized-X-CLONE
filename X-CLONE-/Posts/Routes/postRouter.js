import express from "express";
export const postRouter = express.Router();

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePostContent,
  deletePostById,
  restorePostById,
  GetPostsCreatedByFollowingUsers,
  GetPostsCreatedByUserName,
} from "../Controllers/index.js";

import {
  validatePost,
  validateUpdatePostContent,
  validateDeletePostById,
  validateRestorePostById,
  validateGetPostById,
  ValidateGetPostsCreatedByUserName,
} from "../Validators/index.js";

import { ValidateToken } from "../../Utils/Functions/index.js";

postRouter.get(
  "/posts/following",
  ValidateToken,
  GetPostsCreatedByFollowingUsers
);
postRouter.get("/posts/all", ValidateToken, getAllPosts);
postRouter.get("/posts/:id", validateGetPostById(), getPostById);
postRouter.post("/posts", validatePost(), createPost);
postRouter.patch("/posts/:id", validateUpdatePostContent(), updatePostContent);
postRouter.patch("/posts/delete/:id", validateDeletePostById(), deletePostById);
postRouter.patch(
  "/posts/restore/:id",
  validateRestorePostById(),
  restorePostById
);
postRouter.get(
  "/posts/User/:UserName",
  ValidateGetPostsCreatedByUserName(),
  GetPostsCreatedByUserName
);
