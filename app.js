const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");
var cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 4001;
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const {
  onConnection,
  onDisconnect,
  onIntroduce,
  socketEvent,
} = require("./controllers/socket");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());

app.use(indexRoutes);
app.use("/auth", authRoutes);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

let interval;
io.on(socketEvent.connection, (socket) => {
  onConnection(interval);

  socket.on(socketEvent.disconnect, onDisconnect);

  socket.on(socketEvent.introduce, onIntroduce);
});
server.listen(port, () => console.log(`Listening on port ${port}`));
