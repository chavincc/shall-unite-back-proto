const onConnection = (interval, socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
};

const onDisconnect = (interval) => {
  console.log("Client disconnected");
  clearInterval(interval);
};

const onIntroduce = (name) => {
  console.log(name);
};

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", response);
};

const socketEvent = {
  connection: "connection",
  disconnect: "disconnect",
  introduce: "introduce",
};

module.exports = {
  onConnection,
  onDisconnect,
  onIntroduce,
  socketEvent,
};
