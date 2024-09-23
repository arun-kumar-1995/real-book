import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seatNumber: {
      type: Number,
      trim: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked",
    },
    bookedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", schema);

export default Booking;
