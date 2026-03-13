import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/App.Context";

const sportsList = [
  {
    name: "Badminton",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200"
  },
  {
    name: "Football",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?q=80&w=1200"
  },
  {
    name: "Cricket",
    image:
      "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?q=80&w=1200"
  },
  {
    name: "Basketball",
    image:
      "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1200"
  },
  {
    name: "Tennis",
    image:
      "https://images.unsplash.com/photo-1595433707802-2c7eaf38d3e1?q=80&w=1200"
  },
  {
    name: "Table Tennis",
    image:
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=1200"
  }
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
            onClick={() => handleSportClick(sport.name)}
            className="min-w-[160px] h-[220px] rounded-xl flex items-end p-4 cursor-pointer hover:scale-105 transition bg-cover bg-center relative"
            style={{ backgroundImage: `url(${sport.image})` }}
          >
            <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

            <p className="relative text-white font-semibold text-lg">
              {sport.name}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default FeaturedSports;