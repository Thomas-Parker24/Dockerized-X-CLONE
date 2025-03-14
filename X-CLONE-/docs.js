import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostContent,
  deletePostById,
  restorePostById,
  GetPostsCreatedByFollowingUsers,
} from "./Posts/Docs/PostRouterDocs.js";
import {
  LogInUserNameAndPassWord,
  LogInWithEmailAndPassWord,
  LogOut,
} from "./LogIn/Docs/index.js";
import {
  CreateUser,
  DeleteUser,
  FollowUser,
  GetFollowedUsersByUid,
  GetFollowersByUid,
  GetUserByEmail,
  GetUserByUserName,
  RestoreUser,
  UnFollowUser,
  UpdateUser,
} from "./Users/Docs/index.js";

import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "X-CLONE API",
      version: "1.0.0",
      description: "X-CLONE API Documentation",
    },
    servers: [
      {
        url: "http://localhost:1234",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Posts",
      },
      {
        name: "Users",
      },
      {
        name: "LogIn",
      },
    ],
    paths: {
      "/api/v1/posts/all": {
        get: getAllPosts,
      },
      "/api/v1/posts/:id": {
        get: getPostById,
        patch: updatePostContent,
      },
      "/api/v1/posts/following": {
        get: GetPostsCreatedByFollowingUsers,
      },
      "/api/v1/posts/": {
        post: createPost,
      },
      "/api/v1/posts/delete/:id": {
        patch: deletePostById,
      },
      "/api/v1/posts/restore/:id": {
        patch: restorePostById,
      },
      "/api/v1/Auth/Session/Email": {
        post: LogInWithEmailAndPassWord,
      },
      "/api/v1/Auth/Session/UserName": {
        post: LogInUserNameAndPassWord,
      },
      "api/v1/Auth/Session": {
        delete: LogOut,
      },
      "/api/v1/User": {
        post: CreateUser,
        patch: UpdateUser,
      },
      "/api/v1/User/Delete": {
        patch: DeleteUser,
      },
      "/api/v1/User/Restore": {
        patch: RestoreUser,
      },
      "/api/v1/User/UserName/:UserName": {
        get: GetUserByUserName,
      },
      "/api/v1/User/Email": {
        get: GetUserByEmail,
      },
      "/api/v1/User/Followers/:UserName": {
        get: GetFollowersByUid,
      },
      "/api/v1/User/Followed/:UserName": {
        get: GetFollowedUsersByUid,
      },
      "/api/v1/User/Follow": {
        post: FollowUser,
      },
      "/api/v1/User/UnFollow": {
        post: UnFollowUser,
      },
      "/api/v1/User/User": {
        get: GetFollowersByUid,
      },
    },
  },
  apis: [],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
