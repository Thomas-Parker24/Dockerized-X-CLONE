import { UserModel } from "../../Users/Models/index.js";
import { validationResult } from "express-validator";
import {
  GenerateAccessToken,
  EncryptPassWord,
} from "../../Utils/Functions/index.js";

export async function LogInWithEmailAndPassWord(request, response) {
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

    const { email, passWord } = request.body;
    const EncryptedPassword = EncryptPassWord(passWord);

    const UpdateResult = await UserModel.findOneAndUpdate(
      { email: email, passWord: EncryptedPassword },
      { $set: { isActive: true } }
    ).exec();

    if (!UpdateResult) throw new Error("User not found.");

    response.json({
      ok: true,
      message: "User loggedIn succesfully",
      AccessToken: GenerateAccessToken(UpdateResult._id.toString()),
      Photo: UpdateResult.photo,
      Name: UpdateResult.name,
      UserName: UpdateResult.userName,
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      ok: false,
      message: "Error while trying to LogIn With Email and Password",
      errorDescription: error?.message,
    });
  }
}

export async function LogInWithUserNameAndPassWord(request, response) {
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

    const { UserName, passWord } = request.body;
    const EncryptedPassword = EncryptPassWord(passWord);

    const UpdateResult = await UserModel.findOneAndUpdate(
      { userName: UserName, passWord: EncryptedPassword },
      { $set: { isActive: true } }
    ).exec();

    if (!UpdateResult) throw new Error("User not found.");

    response.json({
      ok: true,
      message: "User logged In succesfully",
      AccessToken: GenerateAccessToken(UpdateResult._id.toString()),
      Photo: UpdateResult.photo,
      Name: UpdateResult.name,
      UserName: UpdateResult.userName,
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      ok: false,
      message: "Error while trying to LogIn With UserName and Password",
      errorDescription: error?.message,
    });
  }
}

export const logOut = async (req, res) => {
  try {
    const queryResult = await UserModel.updateOne(
      { _id: req.user },
      { isActive: false }
    ).exec();

    if (queryResult.matchedCount === 0) throw new Error("User not found.");

    res.json({
      ok: true,
      message: "User loggedOut succesfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error while trying to LogOut",
      errorDescription: error?.message,
    });
  }
};
