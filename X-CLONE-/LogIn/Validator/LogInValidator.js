import { body } from "express-validator";

export function ValidateEmailAndPassWord() {
  return [
    body("email").notEmpty().withMessage("Param Email is obligatory."),
    body("email").isEmail().withMessage("Param email is not a valid Email."),
    body("passWord").notEmpty().withMessage("Param PassWord is empty."),
  ];
}

export function ValidateUserNameAndPassWord() {
  return [
    body("UserName").notEmpty().withMessage("Param UserName is obligatory."),
    body("passWord").notEmpty().withMessage("Param PassWord is obligatory."),
  ];
}
