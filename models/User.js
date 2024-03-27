const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: [true, "Username already taken"],
      required: [true, "Please insert username"],
    },
    firstName: {
      type: String,
      required: [true, "Please insert firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please insert lastName"],
    },
    email: {
      type: String,
      unique: [true, "Duplicate email entered"],
      required: [true, "Please insert email"],
    },
    password: {
      type: String,
      required: [true, "Please insert password"],
    },
    avatarImage: String,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      enum: ["user", "admin", "project-admin"],
      default: ["user"],
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (error) {
      next(error);
    }
    next();
  }
});

const User = mongoose.model("User", userSchema, "User");

module.exports = User;
