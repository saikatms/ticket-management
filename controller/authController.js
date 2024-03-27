const User = require("../models/User");
const jwtService = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({
      userName,
      firstName,
      lastName,
      email,
      password,
    });
    if (user) {
      const token = jwtService.sign(
        {
          sub: { _id: user._id, userName: user.userName },
          iat: new Date().getTime(),
        },
        process.env.JWT_SCERET,
        {
          expiresIn: "15d",
        }
      );
      return res.status(200).send({ message: "Success", token });
    }
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).send({ error: "Username or email already taken" });
    }
  }
};

exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Incorrect Username or Password. Please try again." });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log(">", isPasswordMatched);

    if (isPasswordMatched) {
      const token = jwtService.sign(
        {
          sub: { _id: user._id, userName: user.userName, roles: user.roles },
          iat: new Date().getTime(),
        },
        process.env.JWT_SCERET,
        {
          expiresIn: "15d",
        }
      );
      return res.status(200).send({ message: "Success", token });
    } else {
      return res
        .status(401)
        .send({ error: "No matching records were found. Please try again." });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};
