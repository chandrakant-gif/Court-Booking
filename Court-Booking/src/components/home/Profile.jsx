import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import httpAction from "../../utils/httpAction";

import DEFAULT_AVATAR from "../../../public/avatar-img.jpg"; // put this in /public

const ProfileMenu = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOutHandler = async () => {
    try {
      const data = {
        url: api().logOutUser,
      };
      await httpAction(data);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  if (!user) return null;

  // ✅ Image fallback logic
  const profileImg =
    user.profilePicture && user.profilePicture.trim() !== ""
      ? user.profilePicture
      : DEFAULT_AVATAR;

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Picture Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden border border-white cursor-pointer"
      >
        <img
          src={profileImg}
          alt="Profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = DEFAULT_AVATAR;
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-5 w-75 bg-white  rounded-md shadow-xl z-50">
          {/* Profile Info */}
          <div className="flex items-center mb-2 border-b  gap-3 p-4 ">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = DEFAULT_AVATAR;
                }}
              />
            </div>
            <div className='flex-col items-center '>
                <p className="text-lg ">
              {user.name}
            </p>
            <p className="text-sm text-gray-300 ">
              {user.email}
            </p>

            </div>
          
          </div>

          {/* My Bookings */}
          <button
            onClick={() => {
              navigate("/mybookings");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 "
          >
            <i className="m-2 fa fa-book" aria-hidden="true"></i>
            My Bookings
          </button>

          {/* Sign Out */}
          <button
            onClick={() => {
              logOutHandler();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            <i className=" m-2 fa fa-sign-in" aria-hidden="true"></i>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
