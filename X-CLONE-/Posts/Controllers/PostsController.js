import { validationResult } from "express-validator";
import { PostModel } from "../Models/index.js";
import { getParsedCurrentDateTime } from "../../Utils/Functions/Functions.js";
import { GetFollowedUsersIDByUID } from "../../Users/Controllers/index.js";
import mongoose from "mongoose";

export async function getAllPosts(req, res) {
  try {
    let queryResult = [];

    const { LastPostID, LastPostCreatedAt } = req.query;

    if (LastPostID && LastPostCreatedAt) {
      const lastPostCreatedAtDate = new Date(LastPostCreatedAt);
      queryResult = await PostModel.aggregate([
        {
          $match: {
            createdAt: { $lte: lastPostCreatedAtDate },
            _id: { $ne: new mongoose.Types.ObjectId(LastPostID) },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            let: { creatorUID: { $toObjectId: "$creatorUID" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$creatorUID"] } } },
              { $project: { userName: 1, name: 1, photo: 1 } },
            ],
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            updatedAt: 1,
            deleted: 1,
            content: 1,
            "userInfo.userName": 1,
            "userInfo.name": 1,
            "userInfo.photo": 1,
          },
        },
      ]);
    } else {
      queryResult = await PostModel.aggregate([
        { $match: { deleted: false } },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            let: { creatorUID: { $toObjectId: "$creatorUID" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$creatorUID"] } } },
              { $project: { userName: 1, name: 1, photo: 1 } },
            ],
            as: "userInfo",
          },
        },
        {
          $unwind: "$userInfo",
        },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            updatedAt: 1,
            deleted: 1,
            content: 1,
            "userInfo.userName": 1,
            "userInfo.name": 1,
            "userInfo.photo": 1,
          },
        },
      ]);
    }
    res.status(200).json({
      ok: true,
      length: queryResult.length,
      posts: queryResult,
      lastPostInfo: {
        id:
          queryResult.length > 0
            ? queryResult[queryResult.length - 1]._id
            : undefined,
        CreatedDateTime:
          queryResult.length > 0
            ? queryResult[queryResult.length - 1].createdAt
            : undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get posts",
      errorDescription: error?.message,
    });
  }
}

export async function GetPostsCreatedByFollowingUsers(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }
    const followedUsers = await GetFollowedUsersIDByUID(req.user);

    if (!followedUsers)
      throw new Error("An error ocurred while trying to get Followed Users.");

    const { lastPostIdFollowing, lastPostCreatedAtFollowing } = req.query;

    let queryResult = [];

    if (lastPostIdFollowing && lastPostCreatedAtFollowing) {
      const lastPostCreatedAtFollowingDate = new Date(
        lastPostCreatedAtFollowing
      );

      queryResult = await PostModel.aggregate([
        {
          $match: {
            creatorUID: { $in: followedUsers.followed },
            createdAt: { $lte: lastPostCreatedAtFollowingDate },
            _id: { $ne: new mongoose.Types.ObjectId(lastPostIdFollowing) },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            let: { creatorUID: { $toObjectId: "$creatorUID" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$creatorUID"] } } },
              { $project: { userName: 1, name: 1, photo: 1 } },
            ],
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            updatedAt: 1,
            deleted: 1,
            content: 1,
            "userInfo.userName": 1,
            "userInfo.name": 1,
            "userInfo.photo": 1,
          },
        },
      ]);
    } else {
      queryResult = await PostModel.aggregate([
        {
          $match: {
            creatorUID: { $in: followedUsers.followed },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            let: { creatorUID: { $toObjectId: "$creatorUID" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$creatorUID"] } } },
              { $project: { userName: 1, name: 1, photo: 1 } },
            ],
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            updatedAt: 1,
            deleted: 1,
            content: 1,
            "userInfo.userName": 1,
            "userInfo.name": 1,
            "userInfo.photo": 1,
          },
        },
      ]);
    }

    return res.status(200).json({
      ok: true,
      length: queryResult.length,
      posts: queryResult,
      lastPostInfoFollowing: {
        id:
          queryResult.length > 0
            ? queryResult[queryResult.length - 1]._id
            : undefined,
        createdDateTime:
          queryResult.length > 0
            ? queryResult[queryResult.length - 1].createdAt
            : undefined,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message:
        "An error ocurred while trying to get posts created by followed users.",
      errorDescription: error?.message,
    });
  }
}

export async function GetPostsCreatedByUserName(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { UserName } = req.params;
    const { lastPostId, lastPostCreatedAt } = req.query;
    let queryResult = [];

    if (lastPostId && lastPostCreatedAt) {
      const lastPostCreatedAtDate = new Date(lastPostCreatedAt);

      queryResult = await PostModel.aggregate([
        {
          $lookup: {
            from: "users",
            let: { creatorUID: "$creatorUID" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userName", UserName] },
                      { $eq: [{ $toString: "$_id" }, "$$creatorUID"] },
                    ],
                  },
                },
              },
              { $project: { _id: 1 } },
            ],
            as: "userMatch",
          },
        },
        {
          $match: {
            userMatch: { $ne: [] },
            createdAt: { $lte: lastPostCreatedAtDate },
            _id: { $ne: new mongoose.Types.ObjectId(lastPostId) },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            let: { creatorUID: { $toObjectId: "$creatorUID" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$creatorUID"] } } },
              { $project: { userName: 1, name: 1, photo: 1 } },
            ],
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            updatedAt: 1,
            deleted: 1,
            content: 1,
            "userInfo.userName": 1,
            "userInfo.name": 1,
            "userInfo.photo": 1,
          },
        },
      ]);
    } else {
      queryResult = await PostModel.aggregate([
        {
          $lookup: {
            from: "users",
            let: { creatorUID: "$creatorUID" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userName", UserName] },
                      { $eq: [{ $toString: "$_id" }, "$$creatorUID"] },
                    ],
                  },
                },
              },
              { $project: { _id: 1 } },
            ],
            as: "userMatch",
          },
        },
        {
          $match: {
            userMatch: { $ne: [] },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            let: { creatorUID: { $toObjectId: "$creatorUID" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$creatorUID"] } } },
              { $project: { userName: 1, name: 1, photo: 1 } },
            ],
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            updatedAt: 1,
            deleted: 1,
            content: 1,
            "userInfo.userName": 1,
            "userInfo.name": 1,
            "userInfo.photo": 1,
          },
        },
      ]);
    }

    return res.status(200).json({
      ok: true,
      length: queryResult.length,
      posts: queryResult,
      lastPostInfo: {
        id:
          queryResult.length > 0
            ? queryResult[queryResult.length - 1]._id
            : undefined,
        createdDateTime:
          queryResult.length > 0
            ? queryResult[queryResult.length - 1].createdAt
            : undefined,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message:
        "An error ocurred while trying to get posts created by followed users.",
      errorDescription: error?.message,
    });
  }
}

export async function getPostById(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { id } = req.params;

    const post = await PostModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $toString: "$_id" }, id],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          let: { creatorUID: { $toObjectId: "$creatorUID" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$creatorUID"] } } },
            { $project: { userName: 1, name: 1, photo: 1 } },
          ],
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          updatedAt: 1,
          deleted: 1,
          content: 1,
          "userInfo.userName": 1,
          "userInfo.name": 1,
          "userInfo.photo": 1,
        },
      },
    ]);

    if (!post || post.length === 0) {
      return res.status(404).json({ ok: false, message: "Post not found" });
    }

    const data = post[0];

    res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get post by uid",
      errorDescription: error?.message,
    });
  }
}

export async function createPost(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { content } = req.body;
    const newPost = new PostModel({
      content: content,
      createdAt: getParsedCurrentDateTime(),
      updatedAt: getParsedCurrentDateTime(),
      creatorUID: req.user,
      deleted: false,
    });

    await newPost.save();
    res.status(201).json({
      ok: true,
      message: "Post created successfully",
      data: {
        _id: newPost._id.toString(),
        createdAt: newPost.createdAt,
        updatedAt: newPost.updatedAt,
        deleted: false,
        content: newPost.content,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to create a new post",
      errorDescription: error?.message,
    });
  }
}

export async function updatePostContent(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { id } = req.params;
    const { content } = req.body;

    const queryResult = await PostModel.updateOne(
      { _id: id },
      {
        content: content,
        updatedAt: getParsedCurrentDateTime(),
      }
    ).exec();

    if (queryResult.matchedCount === 0) {
      return res.status(404).json({ ok: false, message: "Post not found." });
    }

    res.status(200).json({
      ok: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to update post content",
      errorDescription: error?.message,
    });
  }
}

export async function deletePostById(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { id } = req.params;

    const queryResult = await PostModel.updateOne(
      { _id: id },
      { deleted: true }
    ).exec();

    if (queryResult.matchedCount === 0) {
      return res.status(404).json({ ok: false, Message: "Post not found" });
    }

    res.status(200).json({
      ok: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to delete post",
      errorDescription: error?.message,
    });
  }
}

export async function restorePostById(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { id } = req.params;

    const queryResult = await PostModel.updateOne(
      { _id: id },
      { deleted: false }
    ).exec();

    if (queryResult.matchedCount === 0) {
      return res.status(404).json({ ok: false, Message: "Post not found" });
    }

    res.status(201).json({
      ok: true,
      message: "Post restored successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to restore post",
      errorDescription: error?.message,
    });
  }
}
