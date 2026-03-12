import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { assets, cities } from "../../assets/quickStay-assets/assets/assets";
import api from "../../utils/api";
import httpAction from "../../utils/httpAction";

const CourtReg = ({ onClose, onSuccess }) => {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    // prevent background scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const [formData, setformData] = useState({
    name: "",
    contact: "",
    address: "",
    city: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      url: api().registerCourt,
      method: "POST",
      body: formData
    };

    const result = await httpAction(data);

    if (result?.hasCourt === true) {
      onSuccess();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >

        {/* LEFT IMAGE */}
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-l-xl hidden md:block object-cover"
        />

        {/* FORM SECTION */}
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10 overflow-y-auto">

          {/* CLOSE BUTTON */}
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={onClose}
          />

          <p className="text-2xl font-semibold mt-6">
            Register Your Court
          </p>

          {/* COURT NAME */}
          <div className="w-full mt-4">
            <label className="text-gray-600 font-medium">
              Court Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              value={formData.name}
              onChange={(e) =>
                setformData({ ...formData, name: e.target.value })
              }
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* PHONE */}
          <div className="w-full mt-4">
            <label className="text-gray-600 font-medium">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Type here"
              value={formData.contact}
              onChange={(e) =>
                setformData({ ...formData, contact: e.target.value })
              }
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* ADDRESS */}
          <div className="w-full mt-4">
            <label className="text-gray-600 font-medium">
              Address
            </label>
            <input
              type="text"
              placeholder="Type here"
              value={formData.address}
              onChange={(e) =>
                setformData({ ...formData, address: e.target.value })
              }
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* CITY */}
          <div className="w-full mt-4">
            <label className="font-medium text-gray-500">
              City
            </label>
            <select
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
              value={formData.city}
              onChange={(e) =>
                setformData({ ...formData, city: e.target.value })
              }
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white rounded px-6 py-2 mt-6 cursor-pointer"
          >
            Register Court
          </button>

        </div>
      </form>
    </div>,
    document.body
  );
};

export default CourtReg;