import Events from "../events/eventName.js";
import Booking from "../models/booking.models.js";
import User from "../models/user.models.js";
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

    const bookedSeatNumber = bookedSeats.map((seat) => Number(seat.seatNumber));

    const totalSeats = 36;

    // emit event upon fetching
    io.emit(Events.UPDATE_CLASSROOM, {
      socketData: {
        totalSeats,
        availableSeats: totalSeats - bookedSeatNumber.length,
        bookedSeats: bookedSeatNumber,
        selectedSeat: userBooked?.seatNumber || 0,
      },
    });
  } catch (err) {
    handleSockerError(socket, err.message);
  }
};

export const bookSeat = async (data, callback) => {
  const { io, socket, seatNumber, selectedDate } = data;
  try {
    const booking = await Booking.create({
      userId: socket.user.id,
      seatNumber: parseInt(seatNumber),
      bookedDate: new Date(selectedDate),
    });

    if (!booking) handleSockerError(socket, "Booking failed");

    const user = await User.findByIdAndUpdate(
      socket.user.id,
      { $addToSet: { bookings: booking?._id } },
      { new: true, upsert: true }
    );

    // Retrieve the updated booked seats
    const bookedSeats = await Booking.find({
      bookedDate: new Date(selectedDate),
      status: "booked",
    })
      .select("seatNumber -_id")
      .lean();

    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);

    const totalSeats = 36;
    io.emit(Events.REFETCH_SEAT, {
      selectedSeat: seatNumber,
      totalSeats,
      bookedSeats: bookedSeatNumbers,
    });
  } catch (err) {
    handleSockerError(socket, err.message);
  }
};
