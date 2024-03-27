const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { userName, firstName, lastName, email, password, roles } = req.body;

  try {
    const user = await User.create({
      userName,
      firstName,
      lastName,
      email,
      password,
      roles,
    });
    if (user) {
      return res.status(200).send({ message: "Success", data: user });
    }
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).send({ error: "Username or email already taken" });
    }
  }
};

exports.updateUser = async (req, res) => {
  const { _id, userName, firstName, lastName, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id },
      {
        userName,
        firstName,
        lastName,
        password,
      }
    );
    if (user) {
      return res.status(200).send({ message: "Success", data: user });
    }
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).send({ error: "Username or email already taken" });
    }
  }
};

exports.deleteUsers = async (req, res) => {
  const { users } = req.body;
  try {
    const user = await User.findByIdAndDelete({ _id: { $in: users } });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send(err);
  }
};
