import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "cancelled", "completed"],
    default: "active",
  },
  // userName:{
  //   type:String,
  //   required:true,
  // }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
