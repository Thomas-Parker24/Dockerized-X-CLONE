import { body, param } from "express-validator";
import { ValidateToken } from "../../Utils/Functions/index.js";

export function ValidateUserName() {
  return [
    param("UserName").notEmpty().withMessage("Param UserName is empty."),
    ValidateToken,
  ];
}

export function ValidateEmail() {
  return [
    body("Email").notEmpty().withMessage("Param Email is empty."),
    body("Email").isEmail().withMessage("Param email is not a valid Email."),
    ValidateToken,
  ];
}

export function ValidateUID() {
  return [
    body("uid").notEmpty().withMessage("Param uid is empty."),
    ValidateToken,
  ];
}

export function ValidateFollowedUID() {
  return [
    body("followedUid").notEmpty().withMessage("Param followedUid is empty."),
    ValidateToken,
  ];
}

export function ValidateFollowerUID() {
  return [
    body("followerUid").notEmpty().withMessage("Param followedUid is empty."),
    ValidateToken,
  ];
}

export function ValidateCreateUserRequest() {
  return [
    body("Name").notEmpty().withMessage("Param Name is empty."),
    body("UserName").notEmpty().withMessage("Param UserName is empty."),
    body("Email").notEmpty().withMessage("Param Email is empty."),
    body("Email").isEmail().withMessage("Param Email is not a valid Email."),
    body("PassWord").notEmpty().withMessage("Param PassWord is empty."),
    body("Description").notEmpty().withMessage("Param Description is empty."),
    body("Photo").notEmpty().withMessage("Param Photo is empty."),
  ];
}

export function ValidateUpdateUserRequest() {
  return [
    body("uid").notEmpty().withMessage("Param uid is empty."),
    body("Name").notEmpty().withMessage("Param Name is empty."),
    body("PassWord").notEmpty().withMessage("Param PassWord is empty."),
    body("Description").notEmpty().withMessage("Param Description is empty."),
    body("Photo").notEmpty().withMessage("Param Photo is empty."),
    ValidateToken,
  ];
}
