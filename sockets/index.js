import { Server } from "socket.io";
import socketHandler from "../controllers/soce.controller.js";

const InitializeSocketConnection = (expressServer) => {
  // setting up socket.io
  const socketIo = new Server(expressServer, {
    cors: {
      origin: "http://localhost:5500",
      methods: ["GET", "POST"],
    },
  });

  socketIo.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // call socket handler
    socketHandler(socketIo, socket);
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // return socket instance
  return socketIo;
};

export default InitializeSocketConnection;
