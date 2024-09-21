import Events from "../events/eventName.js";
import Booking from "../models/booking.models.js";
import handleSockerError from "../sockets/socket.errorHandler.js";

export const getSeatAvailability = async (data, callback) => {
  const { io, socket, inputDate } = data;
  try {
    const query = {
      bookedDate: new Date(inputDate),
      status: "booked",
    };
    const [bookedSeats, userBooked] = await Promise.all([
      await Booking.find(query).select("seatNumber -_id").lean(),
      Booking.findOne({
        userId: socket.user.id,
        ...query,
      })
        .select("seatNumber -_id")
        .lean(),
    ]);

    const bookedSeatNumber = bookedSeats.map((seat) => seat.seatNumber);
    const totalSeats = 36;

    // emit event upon fetching
    io.emit(Events.UPDATE_CLASSROOM, {
      socketData: {
        totalSeats,
        availableSeats: totalSeats - bookedSeatNumber.length,
        bookedSeats: bookedSeatNumber,
        selectedSeat: userBooked.seatNumber,
      },
    });
  } catch (err) {
    handleSockerError(socket, err);
  }
};
