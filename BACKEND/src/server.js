// require("dotenv").config();

// const http = require("http");
// const app = require("./app");
// const connectDB = require("./config/db");
// const { Server } = require("socket.io");

// connectDB();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT"]
//   }
// });

// io.on("connection", (socket) => {
//   console.log("🟢 Client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("🔴 Client disconnected:", socket.id);
//   });
// });

// global.io = io;

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );

require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { Server } = require("socket.io");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // 🔥 localhost hatao
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

global.io = io;

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

