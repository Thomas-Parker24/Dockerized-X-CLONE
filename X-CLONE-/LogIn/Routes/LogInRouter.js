import express from "express";
export const logInRouter = express.Router();
import { ValidateToken } from "../../Utils/Functions/index.js";

import {
  LogInWithEmailAndPassWord,
  LogInWithUserNameAndPassWord,
  logOut,
} from "../Controller/index.js";

import {
  ValidateEmailAndPassWord,
  ValidateUserNameAndPassWord,
} from "../Validator/index.js";

logInRouter.post(
  "/Auth/Session/Email",
  ValidateEmailAndPassWord(),
  LogInWithEmailAndPassWord
);
logInRouter.post(
  "/Auth/Session/UserName",
  ValidateUserNameAndPassWord(),
  LogInWithUserNameAndPassWord
);
logInRouter.delete("/Auth/Session", ValidateToken, logOut);
