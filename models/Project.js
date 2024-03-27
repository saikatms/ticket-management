const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert project name"],
    },
    key: {
      type: String,
      required: [true, "Please insert a project key"],
    },
    description: {
      type: String,
      required: [true, "Please insert description"],
    },
    category: {
      type: String,
      enum: ["Software", "Marketing", "Business", "HR"],
      default: "Software",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Please insert leader"],
    },
    leader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Please insert leader"],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // issues: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Issue",
    //   },
    // ],
  },
  { timestamps: true, versionKey: false }
);

const Project = mongoose.model("Project", ProjectSchema, "Project");

module.exports = Project;
