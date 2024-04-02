import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  roomNumber: {
     type: String,
     required: true,
     unique: true
    },
    roomType:{
      type: String,
      required: true
    },
    pricePerHour: {
      type: Number,
      required: true
    },
    status:{
    type: String,
    required: true,
    enum: ["Booked", "Available"],
    default: "Available",
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
