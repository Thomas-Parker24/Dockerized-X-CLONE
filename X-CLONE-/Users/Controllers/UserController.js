import { validationResult } from "express-validator";
import {
  GenerateAccessToken,
  getParsedCurrentDateTime,
  EncryptPassWord,
} from "../../Utils/Functions/index.js";
import { UserModel } from "../Models/index.js";

export async function GetFollowedUsersIDByUID(userIUD) {
  try {
    if (!userIUD) throw new Error("UserIUD is invalid.");
    return await UserModel.findById(userIUD, "followed").exec();
  } catch (error) {
    return {
      ok: false,
      message: "An error ocurred while trying to get followed array.",
      errorDescription: error?.message,
    };
  }
}

export async function Unfollow(request, response) {
  try {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { followedUid } = request.body;
    const followerUid = request.user;

    const bulkOperations = [
      {
        updateOne: {
          filter: { _id: followerUid },
          update: { $pull: { followed: followedUid } },
        },
      },
      {
        updateOne: {
          filter: { _id: followedUid },
          update: { $pull: { followers: followerUid } },
        },
      },
    ];

    const BulkQueryResult = await UserModel.bulkWrite(bulkOperations);

    if (BulkQueryResult.modifiedCount <= 0)
      throw new Error("Bulk query cannot be executed.");

    response.status(200).json({
      ok: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to unfollow user",
      errorDescription: error?.message,
    });
  }
}

export async function FollowUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { followedUid } = request.body;
    const followerUid = request.user;

    const bulkOperations = [
      {
        updateOne: {
          filter: { _id: followerUid },
          update: { $push: { followed: followedUid } },
        },
      },
      {
        updateOne: {
          filter: { _id: followedUid },
          update: { $push: { followers: followerUid } },
        },
      },
    ];

    const queryResult = await UserModel.bulkWrite(bulkOperations);

    if (queryResult.modifiedCount <= 0)
      throw new Error("Bulk query cannot be executed.");

    response.status(200).json({
      ok: true,
      message: "User followed successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to follow user",
      errorDescription: error?.message,
    });
  }
}

export async function GetFollowersByUid(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const user = await UserModel.find({ _id: request.user }).exec();
    if (!user || user.length === 0) throw new Error("User not found.");

    const followerUsers = await UserModel.find({
      _id: { $in: user[0].followers },
    });

    const jsonResponse = followerUsers.map((U) => ({
      uid: U._id,
      name: U.name,
      userName: U.userName,
      photo: U.photo,
      AlreadyFollowUser: user[0].followed.includes(U._id.toString()),
    }));

    jsonResponse.sort((a, b) => a.name.localeCompare(b.name));
    response.status(200).json({
      ok: true,
      data: {
        followers: jsonResponse,
        lenght: jsonResponse.length,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get followers",
      errorDescription: error?.message,
    });
  }
}

export async function GetFollowersByUserName(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { UserName } = request.params;

    const user = await UserModel.findOne({ userName: UserName }).exec();

    if (!user || user.length === 0) throw new Error("User not found.");

    const followerUsers = await UserModel.find({
      _id: { $in: user.followers },
    });

    const jsonResponse = followerUsers.map((U) => ({
      uid: U._id,
      name: U.name,
      userName: U.userName,
      photo: U.photo,
      AlreadyFollowUser:
        request.user === U._id.toString()
          ? true
          : U.followers.includes(request.user),
    }));

    jsonResponse.sort((a, b) => a.name.localeCompare(b.name));
    response.status(200).json({
      ok: true,
      data: {
        followers: jsonResponse,
        lenght: jsonResponse.length,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get followers",
      errorDescription: error?.message,
    });
  }
}

export async function GetFollowedUsersByUID(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const user = await UserModel.find({ _id: request.user }).exec();
    if (!user || user.length === 0) throw new Error("User not found.");

    const followedUsers = await UserModel.find({
      _id: { $in: user[0].followed },
    });

    const jsonResponse = followedUsers.map((U) => ({
      uid: U._id,
      name: U.name,
      userName: U.userName,
      photo: U.photo,
    }));

    jsonResponse.sort((a, b) => a.name.localeCompare(b.name));
    response.status(200).json({
      ok: true,
      data: {
        followed: jsonResponse,
        lenght: jsonResponse.length,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get followed users",
      errorDescription: error?.message,
    });
  }
}

export async function GetFollowedUsersByUserName(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { UserName } = request.params;

    const user = await UserModel.findOne(
      { userName: UserName },
      "followed"
    ).exec();

    if (!user || user.length === 0) throw new Error("User not found.");

    const followedUsers = await UserModel.find({
      _id: { $in: user.followed },
    });

    const jsonResponse = followedUsers.map((U) => ({
      uid: U._id,
      name: U.name,
      userName: U.userName,
      photo: U.photo,
      CurrentUserAlreadyFollowUser:
        U._id.toString() === request.user
          ? true
          : U.followers.includes(request.user),
    }));

    jsonResponse.sort((a, b) => a.name.localeCompare(b.name));
    response.status(200).json({
      ok: true,
      data: {
        followed: jsonResponse,
        lenght: jsonResponse.length,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get followed users",
      errorDescription: error?.message,
    });
  }
}

export async function GetUserByUserName(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { UserName } = request.params;

    const user = await UserModel.findOne({ userName: UserName }).exec();
    if (!user) throw new Error("User not found.");
    const CreatedAt = new Date(user.CreatedAt).toLocaleDateString();

    response.status(200).json({
      ok: true,
      data: {
        uid: user._id,
        Name: user.name,
        Email: user.email,
        userName: user.userName,
        CreatedAt: CreatedAt,
        LastLogIn: user.LastLogIn,
        isActive: user.isActive,
        photo: user.photo,
        deleted: user.deleted,
        followers: user.followers?.length,
        followed: user.followed?.length,
        CurrentUserFollowUser: user.followers.includes(request.user),
      },
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get user by UserName",
      errorDescription: error?.message,
    });
  }
}

export async function GetUserByEmail(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { Email } = request.body;

    const user = await UserModel.find({ email: Email }).exec();
    if (!user || user.length === 0) throw new Error("User not found.");

    response.status(200).json({
      ok: true,
      data: {
        uid: user[0].id,
        Name: user[0].name,
        Email: user[0].email,
        userName: user[0].userName,
        CreatedAt: user[0].CreatedAt,
        LastLogIn: user[0].LastLogIn,
        isActive: user[0].isActive,
        photo: user[0].photo,
        deleted: user[0].deleted,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get user by Email",
      errorDescription: error?.message,
    });
  }
}

export async function GetUserByUID(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const user = await UserModel.findOne({ _id: request.user }).exec();
    if (!user) throw new Error("User not found.");

    const CreatedAt = new Date(user.CreatedAt).toLocaleDateString();
    response.status(200).json({
      ok: true,
      data: {
        uid: user._id,
        Name: user.name,
        Email: user.email,
        userName: user.userName,
        CreatedAt: CreatedAt,
        LastLogIn: user.LastLogIn,
        isActive: user.isActive,
        photo: user.photo,
        deleted: user.deleted,
        followers: user.followers?.length,
        followed: user.followed?.length,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get user by ID",
      errorDescription: error?.message,
    });
  }
}

export async function CreateUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { Name, UserName, Email, PassWord, Description, Photo } =
      request.body;

    const User = new UserModel({
      name: Name,
      userName: UserName,
      email: Email,
      passWord: EncryptPassWord(PassWord),
      CreatedAt: getParsedCurrentDateTime(),
      LastLogIn: getParsedCurrentDateTime(),
      isActive: true,
      descripción: Description,
      photo: Photo,
      deleted: false,
    });

    await User.save();
    response.status(201).json({
      ok: true,
      message: "User created successfully.",
      AccessToken: GenerateAccessToken(User._id.toString()),
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to create a user",
      errorDescription: error?.message,
    });
  }
}

export async function UpdateUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { uid, Name, PassWord, Description, Photo } = request.body;
    const queryResult = await UserModel.updateOne(
      { _id: uid },
      {
        name: Name,
        passWord: EncryptPassWord(PassWord),
        descripción: Description,
        photo: Photo,
      }
    );
    if (queryResult.matchedCount === 0) throw new Error("User not found");

    response.status(200).json({
      ok: true,
      message: "User updated successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to update user",
      errorDescription: error?.message,
    });
  }
}

export async function DeleteUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { uid } = request.body;
    const queryResult = await UserModel.updateOne(
      { _id: uid },
      { deleted: true }
    );

    if (queryResult.acknowledged === 0)
      throw new Error("Not exists an user with uid given.");

    response.status(200).json({
      ok: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to delete user",
      errorDescription: error?.message,
    });
  }
}

export async function RestoreUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { uid } = request.body;

    const queryResult = await UserModel.updateOne(
      { _id: uid },
      { deleted: false }
    );

    if (queryResult.acknowledged === 0)
      throw new Error("Not exists an user with uid given.");

    response.status(200).json({
      ok: true,
      message: "User retored successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to restore user",
      errorDescription: error?.message,
    });
  }
}
