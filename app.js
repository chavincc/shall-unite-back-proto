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

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());

app.use(indexRoutes);
app.use("/auth", authRoutes);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", response);
};

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on("INTRODUCE", (name) => {
    console.log("name", name);
  });
});
server.listen(port, () => console.log(`Listening on port ${port}`));
