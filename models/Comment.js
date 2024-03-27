const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Please insert some issue description"],
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    issueId: {
      type: Schema.Types.ObjectId,
      ref: "Issue",
      required: [true, "Please provide issue id"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please insert email"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Comment = mongoose.model("Comment", commentSchema, "Comment");

module.exports = Comment;
