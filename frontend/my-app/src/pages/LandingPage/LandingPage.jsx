import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
    <Navbar></Navbar>
    <nav className='flex justify-center mt-8'>
        <ul className='flex gap-16 justify-between '>
          <Link to ='/viewbooking'><li className=' text-black cursor-pointer font-bold hover:scale-105 text-[17px] '>View Bookings</li></Link>
          <Link to ='/addbooking'><li  className='text-black cursor-pointer font-bold  hover:scale-105 text-[17px] '>Create Booking</li></Link>
          {/* <li  className='text-black cursor-pointer font-bold  hover:scale-105 text-[16px] '>Room Catalogue</li> */}
        </ul>
      </nav>

    <div className=" lg:mt-44 sm:mt-32 flex flex-col items-center xsMargin">
      <p className="text-[85px] text-white font-bold aurora-heading">Aurora Retreat</p><p className="text-3xl text-white font-bold aurora-heading">By Rixos</p>

    </div>
     
    </>
  );
};

export default LandingPage;
