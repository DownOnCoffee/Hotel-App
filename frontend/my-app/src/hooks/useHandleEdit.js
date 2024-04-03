    import axios from "axios";
    import { useState } from "react";
    import toast from "react-hot-toast";

    function useHandleEdit(){
        const handleedit=async ({bookingId,userEmail,roomNumber,startTime,endTime,seteditModal})=>{
            if (!userEmail || !roomNumber || !startTime || !endTime) {
                toast.error("Please fill in all fields");
                return;
              }          
            
            await axios
        .put(`http://localhost:5000/api/booking/edit/${bookingId}`, {
            userEmail: userEmail,
            roomNumber: roomNumber,
            startTime: startTime,
            endTime: endTime,
        })
        .then(function (response) {
            const data = response.data;
            console.log(data,'edited data');
            toast.success("Booking has been edited");
            seteditModal(false);
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        })
        .catch(function (error) {
            const errorMessage = error.response?.data?.error || error.error || "An unknown error occurred";
            toast.error(errorMessage);
        });

        }
        return handleedit;

        

    }
    export default useHandleEdit;