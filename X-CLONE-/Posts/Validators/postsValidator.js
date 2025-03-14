import { body, check, param } from "express-validator";
import { ValidateToken } from "../../Utils/Functions/index.js";

export const validatePost = () => {
  return [
    ValidateToken,
    body("content").notEmpty().withMessage("Param content is empty"),
  ];
};

export const ValidateGetPostsCreatedByUserName = () => {
  return [
    ValidateToken,
    param("UserName").notEmpty().withMessage("Param UserName is empty in URL"),
  ];
};

export const validateGetPostById = () => {
  return [
    ValidateToken,
    param("id")
      .isLength({ min: 20 })
      .withMessage("Param id does not have minimal length of 20"),
    param("id").notEmpty().withMessage("Param id is empty"),
  ];
};

export const validateUpdatePostContent = () => {
  return [
    body("content").notEmpty().withMessage("Param content is empty"),
    ValidateToken,
  ];
};

export const validateDeletePostById = () => {
  return [
    param("id")
      .isLength({ min: 20 })
      .withMessage("Param id does not have minimal length of 20"),
    param("id").notEmpty().withMessage("Param id is empty"),
    ValidateToken,
  ];
};

export const validateRestorePostById = () => {
  return [
    param("id")
      .isLength({ min: 20 })
      .withMessage("Param id does not have minimal length of 20"),
    param("id").notEmpty().withMessage("Param id is empty"),
    ValidateToken,
  ];
};
