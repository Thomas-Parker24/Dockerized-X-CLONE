import mongoose, { Schema } from "mongoose";
import { getParsedCurrentDateTime } from "../../Utils/Functions/index.js";

const PostSchema = new Schema({
  createdAt: {
    type: Date,
    default: getParsedCurrentDateTime(),
  },
  updatedAt: {
    type: Date,
    default: getParsedCurrentDateTime(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  creatorUID: {
    type: String,
    require: true,
  },
  content: String,
});

export const PostModel = mongoose.model("Post", PostSchema);
