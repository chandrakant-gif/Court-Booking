import React from "react";
import { cities } from "../../assets/quickStay-assets/assets/assets.js";
import courtImg from "../../assets/court.jpeg";
import { useAppContext } from "../../Context/App.Context.jsx";
import api from "../../utils/api.js";

const Hero = ({
  city,
  setCity,
  filteredCities,
  setFilteredCities
}) => {

  const { navigate } = useAppContext();

  // handle typing in search box
  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.trim() === "") {
      setFilteredCities([]);
      return;
    }

    const filtered = cities.filter((c) =>
      c.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCities(filtered);
  };

  // select from dropdown
  const handleSelect = (selectedCity) => {
    setCity(selectedCity);
    setFilteredCities([]);
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!city) return;

    navigate(`/bookings?destination=${city}`);
  };

  return (
    <div className="h-screen w-full px-6 md:px-16 lg:px-24 xl:px-32 text-white md:flex">

      {/* LEFT SECTION */}
      <div className="h-screen w-full flex flex-col justify-center text-center items-center md:text-start md:items-start">

        <h1 className="text-black text-4xl lg:text-7xl md:text-[56px] md:leading-[80px] font-semibold max-w-[600px] mt-15 md:-ml-12">
          FIND PLAYERS & <span className="md:px-1 text-blue-400">VENUES</span> NEARBY
        </h1>

        <h3 className="mt-6 font-playfair text-gray-800 md:-ml-10 max-w-[400px]">
          Seamlessly explore sports venues and play with sports enthusiasts just like you!
        </h3>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 max-w-[300px] md:max-w-md w-full md:-ml-10 mt-6"
        >

          {/* INPUT */}
          <div className="relative flex items-center w-full border pl-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-md">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 30 30"
              fill="#6B7280"
            >
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>

            <input
              onChange={handleChange}
              type="text"
              placeholder="Ahmedabad"
              className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
              value={city}
            />

            {/* DROPDOWN */}
            {filteredCities.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto z-10">

                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(city)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600"
                  >
                    {city}
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="bg-black w-32 h-[46px] rounded-md text-sm"
          >
            Search
          </button>

        </form>

      </div>

      {/* RIGHT IMAGE */}
      <div className="h-screen flex justify-center items-center w-full">

        <div className="hidden relative md:flex h-90 w-120 transform transition-all duration-300 -rotate-3 z-5 hover:rotate-2">
          <img src={courtImg} className="rounded-3xl" alt="CourtImage" />
        </div>

        <div className="hidden absolute md:flex h-90 w-120 transform bg-blue-200 z-0 rotate-3 rounded-3xl"></div>

      </div>

    </div>
  );
};

export default Hero;