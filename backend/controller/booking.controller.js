import Room from "../models/room.model.js";
import Booking from "../models/booking.model.js";

export const createBooking=async (req,res)=>{
    try{
        const { userEmail, roomNumber, startTime, endTime } = req.body;

       
        const start = new Date(startTime);
        const end = new Date(endTime);
        
        if (start >= end) {
            return res.status(400).json({ error: "Start time must be before end time." });
        }

        const room = await Room.findOne({ roomNumber });
        if (!room) {
            return res.status(404).json({ error: "Room not found." });
        }

        const overlappingBooking = await Booking.findOne({
            roomId: room._id,
            status: 'active',
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }, 
            ],
        });
        console.log('overlapping checked');

        if (overlappingBooking) {
           
            return res.status(400).json({ error: "The room is already booked for the specified time range." });
        }
      
        const durationHours = (end - start) / 36e5; // millisecs to hours
        const price = durationHours * room.pricePerHour;

        
        const newBooking = new Booking({
            userEmail,
            roomId: room._id,
            startTime: start,
            endTime: end,
            price,
            status: 'active', 
        });
        await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", newBooking });
    }catch(err){
        console.log(err);
        // res.status(500).json({error:err});
        const errorMessage = err.message || "An unexpected error occurred during booking creation.";
        res.status(500).json({ error: errorMessage });
    }

};

export const editBooking=async (req,res)=>{
    try{
        const { bookingId } = req.params;
        const { userEmail, roomNumber, startTime, endTime } = req.body;

        const start = new Date(startTime);
        const end = new Date(endTime);
       
        if (start >= end) {
            return res.status(400).json({ error: "Start time must be before end time." });
        }

        // console.log(bookingId);
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({error:"Booking not found"});
        }

        const newRoom = await Room.findOne({ roomNumber: roomNumber });
        if (!newRoom) {
            return res.status(404).json({ error:"Room not found"});
        }

        const overlappingBooking = await Booking.findOne({
            _id: { $ne: bookingId }, 
            roomId: newRoom._id,
            status: 'active',
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }, 
            ],
        });

        if (overlappingBooking) {
            return res.status(400).json({ error: "The room is already booked for the specified time range." });
        }
        const durationHours = (end - start) / 36e5; // millisecs to hours
        const newPrice = durationHours * newRoom.pricePerHour;

        booking.userEmail = userEmail;
        booking.roomId = newRoom._id;
        booking.startTime = start;
        booking.endTime = end;
        booking.price = newPrice;
        await booking.save();
        res.json({ message: "Booking updated successfully", booking });

    }catch(err){
        console.log(err);
        const errorMessage = err.message || "An unexpected error occurred during editing the booking.";
        res.status(500).json({ error: errorMessage });
    }
};
export const deleteBooking=async (req,res)=>{
    try{
        const { bookingId } = req.params;
        console.log(bookingId,"booking id");
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found." });
        }
        booking.status='cancelled';
        const now = new Date();
        const startTime = new Date(booking.startTime);

        const hoursUntilStartTime= (startTime - now) / 36e5; // millisecs to hours

        let refund = 0; // Default refund is 0

        if (hoursUntilStartTime > 48) {
            // Full refund
            refund = booking.price;
        } else if (hoursUntilStartTime <= 48 && hoursUntilStartTime > 24) {
            // 50% refund
            refund = booking.price * 0.5;
        }
       
        await booking.save();
        res.json({
            message: "Booking cancelled successfully.",
            bookingId: booking._id,
            refund: refund
        });

    }catch(err){
        console.log(err);
        const errorMessage = err.message || "An unexpected error occurred .";
        res.status(500).json({ error: errorMessage });
    }

};

export const viewBookings=async (req,res)=>{
    try{
        const { roomFilter, typeFilter, startTimeFilter, endTimeFilter } = req.query;
        let query = {};

        if (roomFilter) {
            const room = await Room.findOne({ roomNumber: roomFilter });
            if (room) {
                query.roomId = room._id;
            }
        }

        if (typeFilter) {
           
            const rooms = await Room.find({ roomType: typeFilter }).select('_id');
            const roomIds = rooms.map(room => room._id);
            query['roomId'] = { $in: roomIds };
        }

        if (startTimeFilter) {
            query.startTime = { $gte: new Date(startTimeFilter) };
        }

        if (endTimeFilter) {
            query.endTime = { $lte: new Date(endTimeFilter) };
        }

        const bookings = await Booking.find(query).populate('roomId', 'roomNumber roomType');
        res.json(bookings);
    }catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }

};