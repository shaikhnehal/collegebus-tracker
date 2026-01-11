import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false, // 🔥 VERY IMPORTANT
});

export default socket;
