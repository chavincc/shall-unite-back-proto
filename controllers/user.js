const Database = require("../database");

const getUsers = async (req, res) => {
  const users = await Database.User.find();
  console.log(users);
  res.status(200).json(users);
};

module.exports = {
  getUsers,
};
