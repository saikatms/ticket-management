const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { name, key, description, category, leader, members, createdBy } =
    req.body;

  try {
    const projectData = await Project.create({
      name,
      key,
      description,
      category,
      leader,
      members,
      createdBy,
    });
    if (projectData) {
      return res.status(200).send({ message: "Success", data: projectData });
    }
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).send({ error: "Username or email already taken" });
    }
  }
};

exports.getProjects = async (req, res) => {
  if (
    req.user &&
    req.user.roles &&
    ["admin", "project-admin"].includes(req.user.roles[0])
  ) {
    try {
      const projects = await Project.find({ owner: req.user._id });
      return res.status(200).send({ message: "Success", data: projects });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    try {
      const projects = await Project.find({ members: req.user._id });
      return res.status(200).send({ message: "Success", data: projects });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};

exports.getProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const projectData = await Project.findById(projectId);
    return res.status(200).send({ message: "Success", data: projectData });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, category, description } = req.body;
  try {
    const project = await Project.findById(projectId);
    project.name = name;
    project.category = category;
    project.description = description;
    const projectData = await project.save();
    return res.status(200).send({ message: "Success", data: projectData });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.addMembers = async (req, res) => {
  const { projectId } = req.params;
  const { users } = req.body;
  try {
    const project = await Project.findById(projectId);
    let members = new Set([...project.members, ...users]);
    const projectData = await Project.findByIdAndUpdate(project, {
      members: [...members],
    });
    return res.status(200).send({ message: "Success", data: projectData });
  } catch (err) {
    return res.status(500).send(err);
  }
};
