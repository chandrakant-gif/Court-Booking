import React, { useMemo, useState } from "react";
import VenueCard from "../components/home/VenueCard.jsx";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../Context/App.Context.jsx";

const Bookings = ({ city, filteredCities, handleChange, handleSelect }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { courts,selectedSport } = useAppContext();

  const [selectedFilters, setSelectedFilters] = useState({
    sports: [],
    venueType: [],
    priceRange: []
  });

  const [selectedSort, setSelectedSort] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  // SEARCH
  const handleSearch = () => {
    if (city) {
      setSearchParams({ destination: city });
    } else {
      setSearchParams({});
    }
  };

  // FILTER CHANGE
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: checked
        ? [...prev[type], value]
        : prev[type].filter((item) => item !== value)
    }));
  };

  // SORT CHANGE
  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // VENUE TYPE FILTER
  const matchesCourtType = (court) => {
    if (selectedFilters.venueType.length === 0) return true;
    return selectedFilters.venueType.includes(court.sportEnvironment);
  };

  // SPORT FILTER
  const matchesSport = (court) => {
    if (selectedFilters.sports.length === 0) return true;

    return selectedFilters.sports.some(
      (sport) => sport.toLowerCase() === court.sportName?.toLowerCase()
    );
  };

  const matchesSportByHome = (court) => {

  if (selectedSport) {
    return court.sportName?.toLowerCase() === selectedSport.toLowerCase();
  }

  if (selectedFilters.sports.length === 0) return true;

  return selectedFilters.sports.some(
    (sport) => sport.toLowerCase() === court.sportName?.toLowerCase()
  );
};

  // PRICE FILTER
  const matchesPriceRange = (court) => {
    if (!selectedFilters.priceRange.length) return true;

    return selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split("-").map(Number);

      return (
        court.pricing?.[0]?.pricePerHour >= min &&
        court.pricing?.[0]?.pricePerHour <= max
      );
    });
  };

  // ✅ CITY FILTER (UPDATED)
  const filterDestination = (court) => {

    const destination = searchParams.get("destination");

    if (!destination) return true;

    const courtCity = court.court?.city;

    if (!courtCity) return false;

    return courtCity.toLowerCase().includes(destination.toLowerCase());
  };

  // SORTING
  const sortRooms = (a, b) => {

    const priceA = a.pricing?.[0]?.pricePerHour || 0;
    const priceB = b.pricing?.[0]?.pricePerHour || 0;

    if (selectedSort === "Price Low to High") {
      return priceA - priceB;
    }

    if (selectedSort === "Price High to Low") {
      return priceB - priceA;
    }

    return 0;
  };

  // FILTERED COURTS
  const filterCourts = useMemo(() => {

    if (!courts) return [];

    return courts
      .filter(
        (court) =>
          matchesCourtType(court) &&
          matchesSport(court) &&
          matchesPriceRange(court) &&
          matchesSportByHome(court)&&
          filterDestination(court)
      )
      .sort(sortRooms);

  }, [courts, selectedFilters, selectedSort, searchParams]);

  return (
    <div>

      {/* TITLE */}
      <div className="text-xl md:text-3xl font-bold px-6 md:px-35 py-6 md:py-10 mt-20">
        Sports <span className="px-1.5">Venues.</span>
        <br />
        <span className="text-lg font-light">
          Discover and Book Nearby Venues
        </span>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center">
        <div className="flex gap-3 px-6 md:px-8 py-5 w-full max-w-[1320px]">

          <div className="relative flex items-center w-full border border-gray-300 bg-white h-11 rounded-lg px-3 gap-2">

            <input
              type="text"
              placeholder="Ahmedabad"
              className="w-full h-full outline-none text-gray-500 text-sm"
              value={city}
              onChange={handleChange}
            />

            {filteredCities.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">

                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(city)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {city}
                  </div>
                ))}

              </div>
            )}

          </div>

          <button
            onClick={handleSearch}
            className="bg-black w-32 h-11 rounded-lg text-sm text-white"
          >
            Search
          </button>

        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex justify-center mt-4 relative">

        <div className="flex justify-between items-center w-full max-w-[1320px] px-6 md:px-8 text-sm text-gray-600">

          <div className="hidden md:flex gap-4 items-center">

            <span className="font-medium">Filter:</span>

            <button
              onClick={() =>
                setActiveFilter(activeFilter === "sports" ? "" : "sports")
              }
              className="hover:underline"
            >
              Sports
            </button>

            <button
              onClick={() =>
                setActiveFilter(activeFilter === "venue" ? "" : "venue")
              }
              className="hover:underline"
            >
              Venue Type
            </button>

          </div>

          <select
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="">Featured</option>
            <option value="Price Low to High">Price: Low to High</option>
            <option value="Price High to Low">Price: High to Low</option>
          </select>

        </div>

        {/* SPORTS FILTER */}
        {activeFilter === "sports" && (
          <div className="absolute top-full left-[220px] mt-2 bg-white shadow-xl rounded-xl p-5 w-[220px] z-20 border">

            {["Cricket", "Football", "Badminton", "Basketball"].map((sport) => (

              <label key={sport} className="flex items-center gap-3 text-sm mb-2">

                <input
                  type="checkbox"
                  checked={selectedFilters.sports.includes(sport)}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, sport, "sports")
                  }
                />

                {sport}

              </label>

            ))}

          </div>
        )}

        {/* VENUE FILTER */}
        {activeFilter === "venue" && (
          <div className="absolute top-full left-[340px] mt-2 bg-white shadow-xl rounded-xl p-5 w-[220px] z-20 border">

            {["Indoor", "Outdoor"].map((type) => (

              <label key={type} className="flex items-center gap-3 text-sm mb-2">

                <input
                  type="checkbox"
                  checked={selectedFilters.venueType.includes(type)}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, type, "venueType")
                  }
                />

                {type}

              </label>

            ))}

          </div>
        )}

      </div>

      {/* COURT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10 max-w-7xl mx-auto px-6 md:px-8">

        {filterCourts.length > 0 ? (
          filterCourts.map((venue) => (
            <VenueCard key={venue._id} venue={venue} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No venues found
          </p>
        )}

      </div>

    </div>
  );
};

export default Bookings;