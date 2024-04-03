import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function useCreateBooking() {
  const handleBooking = ({ userEmail, roomNumber, startTime, endTime }) => {

    const currentDate=new Date();
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);
    if (!userEmail || !roomNumber || !startTime || !endTime) {
      toast.error("Please fill in all fields");
      return;
    }

    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validateEmail = reg.test(String(userEmail).toLowerCase());
    if (validateEmail === false) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (startDateTime <currentDate || endDateTime < currentDate){
      toast.error("Dates can't be set in past");
      return;
    }
    if (startTime >= endTime) {
      toast.error("Start date cannot be after end date.");
      return;
    }


    axios
      .post("http://localhost:5000/api/booking/create", {
        userEmail: userEmail,
        roomNumber: roomNumber,
        startTime: startTime,
        endTime: endTime,
      })
      .then(function (response) {
        // console.log(response);
        const data = response.data;
        console.log(data);
        toast.success("Booking has been created successfully !");
      })
      .catch(function (error) {
        const errorMessage = error.response?.data?.error || error.error || "An unknown error occurred";
        toast.error(errorMessage);
      });
  };
  return handleBooking;
}
export default useCreateBooking;
