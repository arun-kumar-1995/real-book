import Booking from "../models/booking.models.js";
import User from "../models/user.models.js";
import CatchAsyncError from "../utils/catchAsyncError.utils.js";
import ErrorHandler from "../utils/errorHandler.utils.js";
import SendResponse from "../utils/responseHandler.utils.js";

export const classroom = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) return res.redirect("/sign-in");
    return res.render("classroom", { title: "Classroom" });
  } catch (err) {
    next(err);
  }
};

// book seat
export const bookSeat = CatchAsyncError(async (req, res, next, session) => {
  if (!req.isAuthenticated()) return res.redirect("/sign-in");

  const user = await User.findById(req.user.id);
  const booking = await Booking.create([], { session });
  if (!booking) return ErrorHandler(res, 500, "Internal server error");
  return SendResponse(res, 201, "Your seat has been booked");
}, true);
