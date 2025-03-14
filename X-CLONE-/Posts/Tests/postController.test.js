import { createRequest, createResponse } from "node-mocks-http";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  restorePostById,
  updatePostContent,
  GetPostsCreatedByFollowingUsers,
  GetPostsCreatedByUserName,
} from "../Controllers/index.js";
import { PostModel } from "../Models/index.js";
import { UserModel } from "../../Users/Models/index.js";
import { describe, expect, jest, test } from "@jest/globals";
import supertest from "supertest";
import { app } from "../../app.js";

jest.mock("../../Posts/Models");
jest.mock("../../Users/Models");

describe("PostsController.js", () => {
  describe("getAllPosts", () => {
    test("Should return all post", async () => {
      const mockPost = [
        {
          createdAt: "28/09/2024 14:57:35",
          updatedAt: "29/09/2024 14:57:35",
          deleted: false,
          creatorUID: "123",
          content: "Some text",
        },
      ];

      PostModel.aggregate = jest.fn().mockResolvedValue(mockPost);

      const req = createRequest();
      const res = createResponse();

      await getAllPosts(req, res);
      expect(res.statusCode).toBe(200);
    });

    test("Should return all post when properties LastPostID and LastPostCreatedAt are not falsy", async () => {
      const mockPost = [
        {
          createdAt: "28/09/2024 14:57:35",
          updatedAt: "29/09/2024 14:57:35",
          deleted: false,
          creatorUID: "123",
          content: "Some text",
        },
      ];

      PostModel.aggregate = jest.fn().mockResolvedValue(mockPost);

      const req = createRequest();
      const res = createResponse();

      req.query.LastPostID = 1234;
      req.query.LastPostCreatedAt = 1224;
      await getAllPosts(req, res);
      expect(res.statusCode).toBe(200);
    });

    test("Should return an error", async () => {
      PostModel.aggregate = jest
        .fn()
        .mockRejectedValue(new Error("Something went wrong"));

      const req = createRequest();
      const res = createResponse();

      await getAllPosts(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe("Get Posts Created By Following Users", () => {
    test("should return all post", async () => {
      const mockPost = [
        {
          createdAt: "28/09/2024 14:57:35",
          updatedAt: "29/09/2024 14:57:35",
          deleted: false,
          creatorUID: "123",
          content: "Some text",
        },
      ];

      PostModel.aggregate = jest.fn().mockResolvedValue(mockPost);

      UserModel.findById = jest.fn(() => ({
        exec: jest
          .fn()
          .mockResolvedValue({ ok: true, followed: ["1234", "4567"] }),
      }));

      const req = createRequest();
      const res = createResponse();

      req.user = "1234";
      await GetPostsCreatedByFollowingUsers(req, res);
      expect(res.statusCode).toBe(200);
    });

    test("Should return all post when properties LastPostID and LastPostCreatedAt are not falsy", async () => {
      const mockPost = {
        createdAt: "28/09/2024 14:57:35",
        updatedAt: "29/09/2024 14:57:35",
        deleted: false,
        creatorUID: "123",
        content: "Some text",
      };

      PostModel.find = jest.fn(() => ({
        lte: jest.fn(() => ({
          nor: jest.fn(() => ({
            limit: jest.fn(() => ({
              sort: jest.fn(() => ({
                exec: jest.fn().mockResolvedValue(mockPost),
              })),
            })),
          })),
        })),
      }));

      UserModel.findById = jest.fn(() => ({
        exec: jest
          .fn()
          .mockResolvedValue({ ok: true, followed: ["1234", "4567"] }),
      }));

      const req = createRequest();
      const res = createResponse();

      req.body.LastPostID = 1234;
      req.body.LastPostCreatedAt = 1224;
      req.user = "1234";
      await GetPostsCreatedByFollowingUsers(req, res);
    });

    test("should return status 500 ", async () => {
      UserModel.findById = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      const req = createRequest();
      const res = createResponse();
      req.user = "1234";

      await GetPostsCreatedByFollowingUsers(req, res);

      expect(res.statusCode).toBe(500);
    });

    test("should reject request", async () => {
      const result = await supertest(app)
        .get("/api/v1/posts/following")
        .send({});

      expect(result.ok).toBe(false);
    });
  });

  describe("Get Posts Created By UserName", () => {
    test("Should return all post", async () => {
      const mockPost = [
        {
          createdAt: "28/09/2024 14:57:35",
          updatedAt: "29/09/2024 14:57:35",
          deleted: false,
          creatorUID: "123",
          content: "Some text",
        },
      ];

      PostModel.aggregate = jest.fn().mockResolvedValue(mockPost);

      const req = createRequest();
      const res = createResponse();
      req.params = "Jhon Doe";
      await GetPostsCreatedByUserName(req, res);
      expect(res.statusCode).toBe(200);
    });

    test("Should return all post when properties lastPostId and lastPostCreatedAt are not falsy", async () => {
      const mockPost = [
        {
          createdAt: "28/09/2024 14:57:35",
          updatedAt: "29/09/2024 14:57:35",
          deleted: false,
          creatorUID: "123",
          content: "Some text",
        },
      ];

      PostModel.aggregate = jest.fn().mockResolvedValue(mockPost);
      const req = createRequest();
      const res = createResponse();
      req.params = "Jhon Doe";
      req.query.lastPostID = "1234";
      req.query.lastPostCreatedAt = "2024-07-10T04:20:51.000+00:00";
      await GetPostsCreatedByUserName(req, res);
      expect(res.statusCode).toBe(200);
    });

    test("Should return an error", async () => {
      PostModel.aggregate = jest
        .fn()
        .mockRejectedValue(new Error("Something went wrong"));

      const req = createRequest();
      const res = createResponse();

      await GetPostsCreatedByUserName(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe("getPostById", () => {
    test("Should return a post by id", async () => {
      const mockPost = [
        {
          id: "123",
          title: "Test Post",
          content: "This is a test post content",
        },
      ];

      PostModel.aggregate = jest.fn().mockResolvedValue(mockPost);

      const req = createRequest();
      const res = createResponse();

      await getPostById(req, res);

      expect(res.statusCode).toBe(200);
    });

    test("Should return 400 when body is empty", async () => {
      const response = await supertest(app)
        .get(`/api/v1/posts/123`)
        .query({ id: "123" });

      expect(response.ok).toBe(false);
    });

    test("Should return 404 when post not found", async () => {
      PostModel.aggregate = jest.fn().mockResolvedValue(undefined);

      const req = createRequest();
      const res = createResponse();

      await getPostById(req, res);

      expect(res.statusCode).toBe(404);
    });

    test("Should return an error", async () => {
      PostModel.aggregate = jest
        .fn()
        .mockRejectedValue(new Error("Something went wrong"));

      const req = createRequest();
      const res = createResponse();

      await getPostById(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe("createPost", () => {
    test("Should create a post", async () => {
      const req = createRequest({
        body: {
          createdAt: "28/09/2024 14:57:35",
          updatedAt: "29/09/2024 14:57:35",
          deleted: false,
          creatorUID: "123",
          content: "Some text",
        },
      });
      const res = createResponse();

      PostModel.prototype.save = jest.fn().mockResolvedValue({
        createdAt: "28/09/2024 14:57:35",
        updatedAt: "29/09/2024 14:57:35",
        deleted: false,
        creatorUID: "123",
        content: "Some text",
      });

      await createPost(req, res);

      expect(res.statusCode).toBe(201);
    });

    test("Should return 400 when creating post body request is empty", async () => {
      const response = await supertest(app).post("/api/v1/posts").send({});

      expect(response.ok).toBe(false);
    });

    test("Should return an error", async () => {
      const req = createRequest();
      const res = createResponse();

      PostModel.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error("Something went wrong"));

      await createPost(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe("updatePostContent", () => {
    test("Should update post content", async () => {
      const mockPost = {
        id: "123",
        title: "Test Post",
        content: "This is a test post content",
      };

      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(mockPost),
      }));

      const req = createRequest();
      const res = createResponse();

      await updatePostContent(req, res);

      expect(res.statusCode).toBe(200);
    });

    test("Should return 400 when updating post content body request is empty", async () => {
      const response = await supertest(app).patch("/api/v1/posts/123").send({});

      expect(response.ok).toBe(false);
    });

    test("Should return 404 when post does not exist", async () => {
      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue({ matchedCount: 0 }),
      }));

      const req = createRequest();
      const res = createResponse();

      await updatePostContent(req, res);

      expect(res.statusCode).toBe(404);
    });

    test("Should return an error", async () => {
      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error("Something went wrong")),
      }));

      const req = createRequest();
      const res = createResponse();

      await updatePostContent(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe("deletePostById", () => {
    test("Should delete a post by id", async () => {
      const mockPost = {
        id: "123",
        title: "Test Post",
        content: "This is a test post content",
      };

      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(mockPost),
      }));

      const req = createRequest();
      const res = createResponse();

      await deletePostById(req, res);

      expect(res.statusCode).toBe(200);
    });

    test("Should return 400 when body is empty", async () => {
      const response = await supertest(app).patch(`/api/v1/posts/delete/123`);

      expect(response.ok).toBe(false);
    });

    test("Should return 404 when post does not exist", async () => {
      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue({ matchedCount: 0 }),
      }));

      const req = createRequest();
      const res = createResponse();

      await deletePostById(req, res);

      expect(res.statusCode).toBe(404);
    });

    test("Should return an error", async () => {
      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error("Something went wrong")),
      }));

      const req = createRequest();
      const res = createResponse();

      await deletePostById(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe("restorePostById", () => {
    test("Should restore a post by id", async () => {
      const mockPost = {
        id: "123",
        title: "Test Post",
        content: "This is a test post content",
      };

      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(mockPost),
      }));

      const req = createRequest();
      const res = createResponse();

      await restorePostById(req, res);

      expect(res.statusCode).toBe(201);
    });

    test("Should return 400 when body is empty", async () => {
      const response = await supertest(app).patch(`/api/v1/posts/restore/123`);

      expect(response.ok).toBe(false);
    });

    test("Should return 404 when post does not exist", async () => {
      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue({ matchedCount: 0 }),
      }));

      const req = createRequest();
      const res = createResponse();

      await restorePostById(req, res);

      expect(res.statusCode).toBe(404);
    });

    test("Should return an error", async () => {
      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error("Something went wrong")),
      }));

      const req = createRequest();
      const res = createResponse();

      await restorePostById(req, res);

      expect(res.statusCode).toBe(500);
    });
  });
});
