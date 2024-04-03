import React from 'react';
import hotelLogo from "../images/logo1.png";
import profileIcon from "../images/profilesvg.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
     <div className="navbar flex items-center px-10 bg-white  bg-opacity-60">

        {/* navbar start menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn border-none hover:bg-opacity-30 hover:bg-white  btn-circle bg-opacity-0 bg-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="py-6 gap-5 flex items-start justify-start  menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44"
            >
              <li>
                <Link to ='/'>Homepage</Link>
              </li>
              <li>
                <Link to ='/addbooking'>Create Booking</Link>
              </li>
              <li>
                <Link to ='/viewbooking'>View Bookings</Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* center navbar logo */}
        <div className="navbar-center">
          <a className="">
            <Link to ='/'><img src={hotelLogo} alt="" className='w-44 h-[65px] '></img></Link>
          </a>
        </div>

        {/*navbar end */}
        <div className="navbar-end">
          <div className="avatar">
            <div className="w-9 h-9 rounded-full cursor-pointer ">
              <img src={profileIcon} />
            </div>
          </div>
        </div>
      </div>

     
    </>
  )
}

export default Navbar
