import React from 'react';
import Navbar from "../../components/Navbar";
import { useState } from 'react';
import { Link } from "react-router-dom";
import useCreateBooking from "../../hooks/useCreateBooking";

const CreateBooking = () => {
    const [bookingInfo,setbookingInfo]=useState({
        userEmail:'',
        roomNumber:'',
        startTime:'',
        endTime:'',
      });
    const handleBooking=useCreateBooking(); 

    const handleSubmit=(e)=>{
        e.preventDefault();
        handleBooking(bookingInfo);
    }

  return (
    <>
    <Navbar></Navbar> 

    {/* Booking form  */}
    <div className='lg:m-20 sm:m-10 flex justify-center items-center createPgscreen'>
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
 				<h1 className='text-3xl font-bold text-center text-white'>
 					Add Booking
 				</h1>

 				<form onSubmit={handleSubmit}  className='p-3 mt-3 flex flex-col sm:gap-8 gapsmall '>
                    <label className="input input-bordered flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" fill="currentColor"  className="opacity-70 font-bold" width="19 "><path d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z"/></svg>
                        <input onChange={(e) =>setbookingInfo({ ...bookingInfo,  userEmail: e.target.value })}  type="text" className="grow" placeholder="User Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"className="w-4 h-4 opacity-70" viewBox="0 -960 960 960" ><path d="M80-200v-240q0-27 11-49t29-39v-112q0-50 35-85t85-35h160q23 0 43 8.5t37 23.5q17-15 37-23.5t43-8.5h160q50 0 85 35t35 85v112q18 17 29 39t11 49v240h-80v-80H160v80H80Zm440-360h240v-80q0-17-11.5-28.5T720-680H560q-17 0-28.5 11.5T520-640v80Zm-320 0h240v-80q0-17-11.5-28.5T400-680H240q-17 0-28.5 11.5T200-640v80Zm-40 200h640v-80q0-17-11.5-28.5T760-480H200q-17 0-28.5 11.5T160-440v80Zm640 0H160h640Z"/></svg>
                        <input onChange={(e) =>setbookingInfo({ ...bookingInfo, roomNumber: e.target.value })}  type="text" className="grow" placeholder="Room Number" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"className="w-4 h-4 opacity-70"  viewBox="0 -960 960 960" ><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                        <input onChange={(e) =>setbookingInfo({ ...bookingInfo, startTime: e.target.value })} type="date" className="grow" placeholder="Start date"  />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"className="w-4 h-4 opacity-70"  viewBox="0 -960 960 960" ><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                        <input onChange={(e) =>setbookingInfo({ ...bookingInfo, endTime: e.target.value })}  type="date" className="grow" placeholder="End date"  />
                    </label>


                     <div className='flex justify-center items-center'>
                        <button type='submit' className="btn btn-wide text-[15px] btn-info bg-[#6da095] border-[#6da095] hover:bg-gray-300 hover:border-gray-300 ">Create</button>
					</div>
 				</form>
 			</div>
 		</div>
         </div>
      
    </>
  )
}

export default CreateBooking
