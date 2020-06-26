const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const port = process.env.PORT || 4001;
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const {
  onDisconnect,
  onIntroduce,
  socketEvent,
} = require("./controllers/socket");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use(indexRoutes);
app.use("/auth", authRoutes);

const server = http.createServer(app);

const io = socketIo(server);

io.on(socketEvent.connection, (socket) => {
  socket.on(socketEvent.INTRODUCE, (username) => {
    onIntroduce(socket, username);
  });

  socket.on(socketEvent.disconnect, () => {
    onDisconnect(socket.username);
  });
});
server.listen(port, () => console.log(`Listening on port ${port}`));
