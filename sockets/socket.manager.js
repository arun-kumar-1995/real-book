import events from "../events/eventName.js";
import {
  bookSeat,
  getSeatAvailability,
} from "../controllers/socket.controller.js";

import socketHandler from "./socket.handler.js";

// socket is connect socket object
// io  is socket instance
const socketManager = (io, socket) => {
  socket.on(
    events.SEAT_AVAILABLE,
    socketHandler(getSeatAvailability, io, socket)
  );
  socket.on(events.BOOK_SEAT, socketHandler(bookSeat, io, socket));
};

export default socketManager;
