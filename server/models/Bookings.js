import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
 user: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
 sport: {type: mongoose.Schema.Types.ObjectId, ref: "CourtDetails", required: true},
 court: {type: mongoose.Types.ObjectId, ref:"Court", required: true},

 checkInDate: {type: Date, required: true},
 checkOutDate: {type: Date, required: true},
 totalPrice: {type: Number, required: true},
 status: {
  type: String,
  enum: ["pending", "confirmed", "cancelled"],
  default: "pending"
 },
  paymentMethod: {
    type: String,
    required: true,
    default: "pay at court",
  },
  isPaid: {type: Boolean, default: false}

 }

,
{timestamps: true})

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;





