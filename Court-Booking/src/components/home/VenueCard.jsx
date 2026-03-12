import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/quickStay-assets/assets/assets";

const VenueCard = ({ venue }) => {
  return (
    <Link
      to={`/venue/${venue._id}`}
      onClick={() => scrollTo(0, 0)}
      className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[400px]"
    >
      <img
        src={venue.images?.[0] || "/placeholder.jpg"}
        alt="venue"
        className="h-56 w-full object-cover"
      />

      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* SPORT TAG */}
        {venue?.sportName && (
          <div className="flex flex-wrap">
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {venue.sportName}
            </span>
          </div>
        )}

        {/* COURT NAME */}
        <div className="flex items-center justify-between">
          <p className="font-playfair text-lg font-medium text-gray-800">
            {venue.court?.name}
          </p>

          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" />
            <span className="text-sm text-gray-500">
              {venue.rating || "4.5"}
            </span>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="flex items-center gap-1 text-sm">
          <img src={assets.locationIcon} alt="location-icon" />
          <span className="text-gray-500">
            {venue.court?.city}
          </span>
        </div>

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between mt-1">
          <p>
            <span className="text-xl text-gray-800">
              ₹{venue?.pricing?.[0]?.pricePerHour || "NA"}
            </span>
            /hour
          </p>

          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">
            Book Now
          </button>
        </div>

        {/* AMENITIES */}
        <div className="flex flex-wrap gap-2 mt-2">
          {venue?.amenities?.map((item, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
};

export default VenueCard;