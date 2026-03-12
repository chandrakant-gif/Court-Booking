import React from "react";
import VenueCard from "./VenueCard.jsx";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/App.Context.jsx";

const FeaturedDestination = ({ city }) => {
  const { courts = [] } = useAppContext();
  const navigate = useNavigate();

  // create separate cards for each sport
  const expandedCourts = courts.flatMap((court) => {
    if (Array.isArray(court.sportName)) {
      return court.sportName.map((sport) => ({
        ...court,
        sportName: sport,
      }));
    }
    return [court];
  });

  const hasCourts = expandedCourts.length > 0;

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-gray-50 py-20">
      
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-xl md:text-5xl text-gray-800 font-semibold">
            Book Venues
          </h2>

          <h4 className="text-sm text-gray-500 pt-1 font-playfair">
            Popular Venues In {city || "Ahmedabad"}
          </h4>
        </div>

        <button
          className="font-outfit relative border border-black rounded-[5px] px-2 py-1 text-black text-md pr-9 font-bold hover:bg-black hover:text-white"
          onClick={() => navigate("/bookings")}
        >
          See all venues
          <i className="fa-solid fa-circle-chevron-right absolute right-2 top-[25%]"></i>
        </button>
      </div>

      {/* Venue Section */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 mt-20 w-full min-h-[260px]">

        {hasCourts ? (

          expandedCourts.slice(0, 4).map((venue, index) => (
            <VenueCard venue={venue} key={`venue-${venue._id}-${index}`} />
          ))

        ) : (

          <div className="flex flex-col items-center justify-center text-center w-full text-gray-400">
            
            <i className="fa-solid fa-map-location-dot text-4xl mb-3 opacity-40"></i>

            <p className="text-lg">
              No venues available in {city || "this city"} yet
            </p>

            <p className="text-sm mt-1">
              Check back later or explore other locations.
            </p>

          </div>

        )}

      </div>
    </div>
  );
};

export default FeaturedDestination;