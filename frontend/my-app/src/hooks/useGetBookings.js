import axios from "axios";
import { useState, useEffect } from "react";

function useGetBookings() {
    const [bookings,setbookings]=useState([]);
    const [error, setError] = useState(null);

    const fetchBookings = async (filters) => {
      try {
          const params = new URLSearchParams(filters);
          const response = await axios.get(`http://localhost:5000/api/booking/view?${params}`);
          setbookings(response.data);
      } catch (error) {
          setError(error);
      }
  };


    useEffect(() => {
        axios
          .get("http://localhost:5000/api/booking/view")
          .then(function (response) {
            const data=response.data;

            setbookings(data);
            console.log(bookings,"op");
          })
          .catch(function(error) {
          
            setError(error);
            console.log(error);
          })
          
      }, []);

      return {bookings,error,fetchBookings};
}
export default useGetBookings;
