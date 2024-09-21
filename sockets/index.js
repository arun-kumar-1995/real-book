import { Server } from "socket.io";
import socketManager from "../sockets/socket.manager.js";
import Events from "../events/eventName.js";

const InitializeSocketConnection = (expressServer) => {
  // setting up socket.io
  const socketIo = new Server(expressServer, {
    cors: {
      origin: "http://localhost:5500",
      methods: ["GET", "POST"],
    },
  });

  // apply middleware here

  socketIo.on(Events.CONNECT, (socket) => {
    console.log("A user connected:", socket.id);
    // call socket mager ti handle socket connection at one place
    socketManager(socketIo, socket);
    socket.on(Events.DISCONNECT, () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // return socket instance
  return socketIo;
};

export default InitializeSocketConnection;
