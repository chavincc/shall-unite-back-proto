const Database = require("../database");

const loginController = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send({
      message: "name cannot be empty",
    });
  }
  try {
    const user = await Database.User.findOne({ username });
    if (!user) {
      Database.User.create({
        username,
      });
    }
    return res
      .status(200)
      .cookie("username", username, { httpOnly: true })
      .json(username);
  } catch (error) {
    return res.status(400).send({
      message: "fail to create",
    });
  }
};

const logoutController = async (req, res) => {
  res.status(200).clearCookie("username").send("log out");
};

const getAuthController = async (req, res) => {
  const { username } = req.cookies;
  if (!username) {
    return res.status(401).send("unauthorized");
  } else {
    return res.status(200).json(username);
  }
};

module.exports = {
  loginController,
  logoutController,
  getAuthController,
};