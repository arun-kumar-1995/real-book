import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seatNumber: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },
    bookedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", schema);

export default Booking;
