import mongoose, { Schema } from "mongoose";
import { getParsedCurrentDateTime } from "../../Utils/Functions/index.js";

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  passWord: {
    type: String,
    require: true,
  },
  CreatedAt: {
    type: Date,
    default: getParsedCurrentDateTime(),
  },
  LastLogIn: {
    type: Date,
    default: getParsedCurrentDateTime(),
  },
  isActive: {
    type: Boolean,
  },
  deleted: Boolean,
  descripción: String,
  photo: String,
  followers: [String],
  followed: [String],
});

export const UserModel = mongoose.model("User", UserSchema);
