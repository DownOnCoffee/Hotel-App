import express from "express";
import ConnectToDb from "./db/ConnectToDb.js";
import dotenv from "dotenv";
import bookingRoutes from './routes/booking.routes.js';
const app=express();

app.use(express.json());
dotenv.config();

// app.get('/',(req,res)=>{
//     res.send('hotel landing page ')
// });

//Booking routes
app.use('/api/booking',bookingRoutes);

app.listen(5000,()=>{console.log(`Server started at port 5000`)});
