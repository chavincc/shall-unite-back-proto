const Database = require("../database");

const onDisconnect = async (username) => {
  console.log(username, "disconnected");
  await Database.User.findOneAndUpdate({ username }, { isOnline: false });
};

const onIntroduce = async (socket, username) => {
  console.log(username, "connected");
  socket.username = username;
  await Database.User.findOneAndUpdate({ username }, { isOnline: true });
};

const socketEvent = {
  connection: "connection",
  disconnect: "disconnect",
  INTRODUCE: "INTRODUCE",
};

module.exports = {
  onDisconnect,
  onIntroduce,
  socketEvent,
};
