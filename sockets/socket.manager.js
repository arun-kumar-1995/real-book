import events from "../events/eventName.js";
import { getSeatAvailability } from "../controllers/socket.controller.js";
import socketHandler from "./socket.handler.js";

const socketManager = (io, socket) => {
  socket.on(events.SEAT_AVAILABILITY, socketHandler(getSeatAvailability, io));
};

export default socketManager;
