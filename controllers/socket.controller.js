import Events from "../events/eventName.js";
import Booking from "../models/booking.models.js";
import handleSockerError from "../sockets/socket.errorHandler.js";

export const getSeatAvailability = async (data, callback) => {
  const { io, inputDate } = data;
  try {
    // const seat = await Booking.find({ bookedDate: inputDate, status: booked });
    // console.log(seat);
    // emit event upon fetching

    io.emit(Events.UPDATE_CLASSROOM, {
      socketData: {
        totalSeats: 36,
        availableSeats: 48, //totalSeats - bookedSeats.length,
        bookedSeats: [4, 8, 9, 45],
        selectedSeat: 4,
      },
    });
  } catch (err) {
    console.log(err);
    // handleSockerError(socket, err);
  }
};
