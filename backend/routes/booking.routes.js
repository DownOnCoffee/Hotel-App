import express from 'express';
import { createBooking,editBooking,viewBookings,deleteBooking } from '../controller/booking.controller.js';
const router=express.Router();

router.post('/create',createBooking);
router.put('/edit/:bookingId',editBooking);
router.delete('/delete/:bookingId',deleteBooking);
router.get('/view',viewBookings);

export default router;

