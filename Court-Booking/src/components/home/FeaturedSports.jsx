import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/App.Context";

const sportsList = [
  "Badminton",
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "Table Tennis"
];

const FeaturedSports = () => {

  const navigate = useNavigate();
  const { setSelectedSport } = useAppContext();

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
    navigate("/bookings");
  };

  return (
    <div className="flex flex-col px-6 md:px-16 lg:px-24 bg-white py-20">

      <h2 className="text-xl md:text-5xl text-gray-800 font-semibold">
        Popular Sports
      </h2>

      <h4 className="font-playfair text-sm pt-1 text-gray-500">
        Choose your favorite sport and find the venue
      </h4>

      <div className="flex gap-6 mt-14 overflow-x-auto">

        {sportsList.map((sport, index) => (

          <div
            key={index}
            onClick={() => handleSportClick(sport)}
            className="min-w-[140px] h-[220px] bg-gray-200 rounded-xl flex items-end p-3 cursor-pointer hover:scale-105 transition"
          >
            <p className="text-white font-semibold text-lg">
              {sport}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
};

export default FeaturedSports;