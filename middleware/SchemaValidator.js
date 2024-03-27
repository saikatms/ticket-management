const joi = require("joi");
const errorFunction = require("../utils/errorFunction");

exports.userValidation = async (req, res, next) => {
  const payload = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    roles: req.body.roles,
    // avatarImage: req.body.avatarImage,
  };
  const validation = joi.object({
    userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    firstName: joi.string().min(2).max(20).trim(true).required(),
    lastName: joi.string().min(2).max(20).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
    roles: joi
      .string()
      .valid("user", "admin", "project-admin")
      .default(["user"]),
    // avatarImage: joi.string().trim(true),
  });

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};

exports.updateUserValidation = async (req, res, next) => {
  const payload = {
    _id: req.body._id,
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    // email: req.body.email,
    password: req.body.password,
    // roles: req.body.roles,
    isVerified: req.body.isVerified,
    // isBlocked: req.body.isBlocked,
    // avatarImage: req.body.avatarImage,
  };
  const validation = joi.object({
    _id: joi.string().trim(true).required(),
    userName: joi.string().alphanum().min(3).max(25).trim(true),
    firstName: joi.string().min(2).max(20).trim(true),
    lastName: joi.string().min(2).max(20).trim(true),
    password: joi.string().min(8).trim(true),
    isVerified: joi.boolean(),
    // roles: joi
    //   .string()
    //   .valid("user", "admin", "project-admin")
    //   .default(["user"]),
    // isBlocked: joi.bool,
  });

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};

exports.projectValidation = async (req, res, next) => {
  const payload = {
    name: req.body.name,
    key: req.body.key,
    description: req.body.description,
    category: req.body.category,
    leader: req.body.leader,
    members: req.body.members,
    createdBy: req.body.createdBy,
  };
  const validation = joi.object({
    name: joi.string().min(5).trim(true).required(),
    key: joi.string().min(2).max(20).trim(true).required(),
    description: joi.string().min(10).trim(true).required(),
    category: joi
      .string()
      .valid("Software", "Marketing", "Business", "HR")
      .default(["Software"]),
    leader: joi.string().trim(true),
    members: joi.array().items(joi.string()),
    createdBy: joi.string().trim(true).required(),
    // avatarImage: joi.string().trim(true),
  });

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};

exports.updateProjectValidation = async (req, res, next) => {
  const payload = {
    name: req.body.name,
    key: req.body.key,
    description: req.body.description,
    category: req.body.category,
    leader: req.body.leader,
    members: req.body.members,
    createdBy: req.body.createdBy,
  };
  const validation = joi.object({
    name: joi.string().min(5).trim(true),
    key: joi.string().min(2).max(20).trim(true),
    description: joi.string().min(10).trim(true),
    category: joi
      .string()
      .valid("Software", "Marketing", "Business", "HR")
      .default(["Software"]),
    leader: joi.string().trim(true),
    members: joi.array().items(joi.string()),
    createdBy: joi.string().trim(true),
  });

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};

exports.issueValidation = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    issueType: req.body.issueType,
    description: req.body.description,
    assignee: req.body.assignee,
    status: req.body.status,
    priority: req.body.priority,
  };
  const validation = joi.object({
    title: joi.string().min(5).trim(true).required(),
    issueType: joi
      .string()
      .valid("Improvement", "Task", "Bug")
      .default(["Task"]),
    description: joi.string().min(10).trim(true).required(),
    status: joi
      .string()
      .valid("Backlog", "Open", "To Do", "InProgress", "InReview", "Done")
      .default(["To Do"]),
    priority: joi
      .string()
      .valid("Lowest", "Low", "Medium", "High", "Highest")
      .default(["Medium"]),
    assignee: joi.string().trim(true),
  });

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};
