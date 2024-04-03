import React from "react";
import useGetBookings from "../../hooks/useGetBookings";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import useHandleEdit from "../../hooks/useHandleEdit";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

const ViewBooking = () => {
  const { bookings, error, fetchBookings } = useGetBookings();
  const [editModal, seteditModal] = useState(false);
  const [selectedBooking, setselectedBooking] = useState(null);

  const [roomFilter, setRoomFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startTimeFilter, setStartTimeFilter] = useState("");
  const [endTimeFilter, setEndTimeFilter] = useState("");

  const handleFilter = () => {
    fetchBookings({ roomFilter, typeFilter, startTimeFilter, endTimeFilter });
  };
  const handleDelete = async (bookingId) => {
    console.log(bookingId,"iddddd");
    
    await axios
      .delete(`http://localhost:5000/api/booking/delete/${bookingId}`)
      .then(function (response) {
        console.log(response);
        const data=response.data;
        let refund=data.refund;
        toast.success(data.message);
        setTimeout(() => {
          refund>0?toast.success(`Refund of ${refund} has been initiated .`):toast.error('No refund possible');
        }, 1000);
       
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      })
      
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="flex sm:justify-between mt-4 mx-10 items-center buttonsxs ">
        <Link to="/addbooking">
          <button
            type="submit"
            className="btn w-[150px] text-[14px] btn-info bg-[#a9eef7] border-[#a9eef7] hover:bg-white hover:border-gray-300 "
          >
            Add Booking
          </button>
        </Link>
        <div>
          <div className="filters show-on-large space-x-2">
            <input
              type="text"
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              placeholder="Filter by Room Number"
              className=" bg-white input input-bordered input-info input-[9px]  cursor-pointer max-w-xs"
            />
            <input
              type="text"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              placeholder="Filter by Room Type"
              className=" bg-white input input-bordered input-info input-[9px] cursor-pointer max-w-xs"
            />
            <input
              type="date"
              value={startTimeFilter}
              onChange={(e) => setStartTimeFilter(e.target.value)}
              placeholder="Start Date"
              className=" bg-gray-200 input input-bordered input-info input-[9px] cursor-pointer max-w-xs"
            />
            <input
              type="date"
              value={endTimeFilter}
              onChange={(e) => setEndTimeFilter(e.target.value)}
              placeholder="End date"
              className="bg-gray-200 input input-bordered input-info input-[9px] cursor-pointer max-w-xs"
            />
            <button
              type="submit"
              className="btn w-[120px] text-[14px] btn-info bg-green-300 border-green-300 hover:bg-white hover:border-gray-300 "
              onClick={handleFilter}
            >
              Apply Filters
            </button>
            <button
              type="submit"
              className="btn w-[120px] text-[14px] btn-info bg-green-300 border-green-300 hover:bg-white hover:border-gray-300 "
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </button>
          </div>
          <div className="dropdown hide-on-large space-x-3">
            <div
              tabIndex={0}
              role="button"
              className="btn border-none hover:bg-opacity-30 hover:bg-white  btn-circle bg-opacity-0 bg-black"
            >
             <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" className="h-6 w-6 cursor-pointer"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
              
            </div>
            <ul
              tabIndex={0}
              className="py-6 gap-5 flex items-start justify-start  menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
            >
              <li>
                <input
                  type="text"
                  value={roomFilter}
                  onChange={(e) => setRoomFilter(e.target.value)}
                  placeholder="Filter by Room Number"
                  className=" bg-white input input-bordered input-info input-[9px]  cursor-pointer max-w-xs"
                />
              </li>
              <li>
                <input
                  type="text"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  placeholder="Filter by Room Type"
                  className=" bg-white input input-bordered input-info input-[9px] cursor-pointer max-w-xs"
                />
              </li>
              <li>
                <input
                  type="date"
                  value={startTimeFilter}
                  onChange={(e) => setStartTimeFilter(e.target.value)}
                  placeholder="Start Date"
                  className=" bg-gray-200 input input-bordered input-info input-[9px] cursor-pointer max-w-xs"
                />
              </li>
              <li>
                <input
                  type="date"
                  value={endTimeFilter}
                  onChange={(e) => setEndTimeFilter(e.target.value)}
                  placeholder="End date"
                  className="bg-gray-200 input input-bordered input-info input-[9px] cursor-pointer max-w-xs"
                />
              </li>
            </ul>
            <button
              type="submit"
              className="btn w-[120px] text-[14px] btn-info bg-green-300 border-green-300 hover:bg-white hover:border-gray-300 "
              onClick={handleFilter}
            >
              Apply Filters
            </button>
            <button
              type="submit"
              className="btn w-[120px] text-[14px] btn-info bg-green-300 border-green-300 hover:bg-white hover:border-gray-300 "
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div
        className={`m-8 sm:h-[400px] md:h-[400px] lg:h-[450px] overflow-y-scroll xsscreen  `}
      >
        <table className="table bg-white rounded-none shadow-lg ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Booking ID</th>
              <th>Email</th>
              <th>Room type</th>
              <th>Room number</th>
              <th>Price</th>
              <th>Status</th>
              <th>Arrival time</th>
              <th>Departure type</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <th>{booking._id}</th>
                <td>{booking.userEmail}</td>
                <td>{booking.roomId.roomType}</td>
                <td>{booking.roomId.roomNumber}</td>
                <td>{booking.price}</td>
                <td>{booking.status}</td>
                <td>{booking.startTime}</td>
                <td>{booking.endTime}</td>
                
                <td>
                  <button
                    className="btn btn-ghost btn-xs text-green-500 font-bold"
                    onClick={() => {
                      setselectedBooking(booking);
                      seteditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-ghost btn-xs text-red-600 font-bold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
              <EditBookingForm
                seteditModal={seteditModal}
                selectedBooking={selectedBooking}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewBooking;

const EditBookingForm = ({ seteditModal, selectedBooking }) => {
  const handleedit = useHandleEdit();

  const StartDate = format(new Date(selectedBooking.startTime), "yyyy-MM-dd");
  const EndDate = format(new Date(selectedBooking.endTime), "yyyy-MM-dd");
  const [editValue, setEditValue] = useState({
    bookingId: selectedBooking.bookingId,
    userEmail: selectedBooking.userEmail,
    roomNumber: selectedBooking.roomId.roomNumber,
    startTime: StartDate,
    endTime: EndDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleedit({ ...editValue, bookingId: selectedBooking._id, seteditModal });
  };

  return (
    <div className="p-2 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-center text-black">
        Edit Booking
      </h1>

      <form onSubmit={handleSubmit} className="p-3 mt-3 flex flex-col gap-3 ">
        <label className="input input-bordered flex items-center gap-3">
          <svg
            xmlns="http:www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            fill="currentColor"
            className="opacity-70 font-bold"
            width="19 "
          >
            <path d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z" />
          </svg>
          <input
            name="userEmail"
            type="text"
            value={editValue.userEmail}
            onChange={handleChange}
            className="grow"
            placeholder="User email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"className="w-4 h-4 opacity-70" viewBox="0 -960 960 960" ><path d="M80-200v-240q0-27 11-49t29-39v-112q0-50 35-85t85-35h160q23 0 43 8.5t37 23.5q17-15 37-23.5t43-8.5h160q50 0 85 35t35 85v112q18 17 29 39t11 49v240h-80v-80H160v80H80Zm440-360h240v-80q0-17-11.5-28.5T720-680H560q-17 0-28.5 11.5T520-640v80Zm-320 0h240v-80q0-17-11.5-28.5T400-680H240q-17 0-28.5 11.5T200-640v80Zm-40 200h640v-80q0-17-11.5-28.5T760-480H200q-17 0-28.5 11.5T160-440v80Zm640 0H160h640Z"/></svg>
          <input
            name="roomNumber"
            type="text"
            className="grow"
            value={editValue.roomNumber}
            onChange={handleChange}
            placeholder="Room Number"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"className="w-4 h-4 opacity-70"  viewBox="0 -960 960 960" ><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
          <input
            name="startTime"
            type="date"
            value={editValue.startTime}
            onChange={handleChange}
            className="grow"
            placeholder="Start date"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"className="w-4 h-4 opacity-70"  viewBox="0 -960 960 960" ><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
          <input
            name="endTime"
            type="date"
            className="grow"
            value={editValue.endTime}
            onChange={handleChange}
            placeholder="End date"
          />
        </label>

        <div className="mt-4 flex justify-center space-x-3">
          <button onClick={()=>{seteditModal(false)}} className="btn border-none hover:bg-red-800  text-white font-bold text-[14px]  bg-red-600">
            Cancel
          </button>
          <button
            type="submit"
            className="btn border-none hover:bg-[#222a5c]   text-white font-bold text-[14px] bg-[#5a85e8]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
