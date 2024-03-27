const mongoose = require("mongoose");

const { Schema } = mongoose;

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please insert issue title"],
    },
    issueType: {
      type: String,
      enum: ["Improvement", "Task", "Bug"],
      default: "Task",
    },
    description: {
      type: String,
      required: [true, "Please insert description"],
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Backlog", "Open", "To Do", "InProgress", "InReview", "Done"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Lowest", "Low", "Medium", "High", "Highest"],
      default: "Medium",
    },
    // listPosition: {
    //   type: Number,
    //   default: 0,
    // },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // projectKey: {
    //   type: String,
    //   required: true,
    // },
    attachments: [{ data: Buffer, contentType: String }],
  },
  { timestamps: true, versionKey: false }
);

const Issue = mongoose.model("Issue", IssueSchema, "Issue");

module.exports = Issue;
