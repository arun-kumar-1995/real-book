import Booking from "../models/booking.models.js";
import User from "../models/user.models.js";
import CatchAsyncError from "../utils/catchAsyncError.utils.js";
import ErrorHandler from "../utils/errorHandler.utils.js";
import SendResponse from "../utils/responseHandler.utils.js";

export const classroom = async (req, res, next) => {
  try {
    // if (!req.isAuthenticated()) return res.redirect("/sign-in");
    return res.render("classroom", { title: "Classroom" });
  } catch (err) {
    next(err);
  }
};

// book seat
export const bookSeat = CatchAsyncError(async (req, res, next, session) => {
  if (!req.isAuthenticated()) return res.redirect("/sign-in");
  const { seatNumber, selectedDate } = req.body;
  const booking = await Booking.create(
    [
      {
        userId: req.user.id,
        seatNumber: parseInt(seatNumber),
        bookedDate: new Date(selectedDate),
      },
    ],
    { session }
  );

  if (!booking) return ErrorHandler(res, 500, "Booking failed");
  await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { bookings: booking[0]?._id } },
    { new: true, upsert: true, session }
  );

  return SendResponse(
    res,
    201,
    "Your seat has been booked",
    { booking },
    "/classroom"
  );
}, true);
