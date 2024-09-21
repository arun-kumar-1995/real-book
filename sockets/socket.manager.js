import events from "../events/eventName.js";
import { getSeatAvailability } from "../controllers/socket.controller.js";
import socketHandler from "./socket.handler.js";

// socket is connect socket object
// io  is socket instance
const socketManager = (io, socket) => {
  socket.on(events.SEAT_AVAILABLE, socketHandler(getSeatAvailability, io));
};

export default socketManager;
