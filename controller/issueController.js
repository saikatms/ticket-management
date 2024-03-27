const Issue = require("../models/Issue");

exports.getIssueByCurrentUser = async (req, res) => {
  try {
    const issues = await Issue.find({ assignee: req.user._id });
    return res.status(200).send({ message: "Success", data: issues });
  } catch (err) {
    return res.status(204).send({ error: "No issues found for this user." });
  }
};

exports.getUserIssues = async (req, res) => {
  const { userId } = req.params;
  try {
    const issues = await Issue.find({ assignee: userId });
    return res.status(200).send({ message: "Success", data: issues });
  } catch (err) {
    return res.status(204).send({ error: "No issues found for this project." });
  }
};

exports.getIssueByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const issues = await Issue.find({ projectId });
    return res.status(200).send({ message: "Success", data: issues });
  } catch (err) {
    return res.status(204).send({ error: "No issues found for this user." });
  }
};

exports.getIssueById = async (req, res) => {
  const { issueId } = req.params;
  try {
    const issue = await Issue.findById(issueId);
    return res.status(200).send(issue);
  } catch (err) {
    return res
      .status(204)
      .send({ error: `No issues found with ID: ${issueId}` });
  }
};

exports.createIssue = async (req, res) => {
  const { title, issueType, description, priority, assignee } = req.body;
  const reporter = req.user._id;
  const { projectId } = req.params;
  const newIssue = new Issue({
    title,
    issueType,
    description,
    priority,
    assignee,
    reporter,
    projectId,
  });

  try {
    const issueData = await newIssue.save();
    res.status(200).send({ message: "Success", data: issueData });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.editIssue = async (req, res) => {
  const { issueId } = req.params;
  const {
    title,
    issueType,
    description,
    priority,
    assignee,
    reporter,
    dueDate,
    startDate,
    status,
  } = req.body;
  try {
    const issue = await Issue.findById(issueId);
    issue.title = title;
    issue.issueType = issueType;
    issue.reporter = reporter;
    issue.description = description;
    issue.priority = priority;
    issue.assignee = assignee;
    issue.dueDate = dueDate;
    issue.startDate = startDate;
    issue.status = status;

    const saved = await issue.save();
    res.status(200).send(saved);
  } catch (error) {}
};
