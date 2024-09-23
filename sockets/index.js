import { Server } from "socket.io";
import socketManager from "../sockets/socket.manager.js";
import Events from "../events/eventName.js";
import socketAuth from "./socket.auth.js";

const InitializeSocketConnection = (expressServer) => {
  // setting up socket.io
  const socketIo = new Server(expressServer);

  // apply middleware here

  socketIo.on(Events.CONNECT, (socket) => {
    console.log("A user connected:", socket.id);

    //assign user to socket so that is available
    const cookieString = socket.request.headers?.cookie;
    socketAuth(socket, cookieString);

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
