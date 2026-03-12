import React, { useState, useEffect } from "react";
import { assets } from "../assets/quickStay-assets/assets/assets";
import { useParams } from "react-router-dom";
import { useAppContext } from "../Context/App.Context";

const VenueBooking = () => {

  const { id } = useParams();
  const { courts } = useAppContext();

  const [venue, setVenue] = useState(null);
  const [selectedTable, setSelectedTable] = useState("");
  const [addDuration, setAddDuration] = useState(1);

  useEffect(() => {

    if (!courts) return;

    const foundVenue = courts.find((court) => court._id === id);

    if (foundVenue) setVenue(foundVenue);

  }, [courts, id]);

  return (
    venue && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24">

        <h1 className="text-xl lg:text-3xl font-semibold">
          Court Booking
        </h1>

        <div className="gap-1 shadow-sm bg-white flex flex-col justify-center pl-10 w-full border border-gray-100 h-auto rounded-xl mt-10 p-6">

          <div>

            <h1 className="text-2xl">
              {venue?.sportName}
            </h1>

            <div className="flex gap-3 py-2">

              <div className="flex gap-1">
                <img src={assets.locationIcon} alt="location-icon" />
                <span className="text-sm text-gray-500">
                  {venue?.court?.city}
                </span>
              </div>

              <div className="flex gap-1">
                <img src={assets.starIconFilled} alt="star-icon" />
                <span className="text-sm text-gray-500">
                  {venue?.rating}
                </span>
              </div>

            </div>

            <div className="mt-10 flex flex-col">

              {/* SPORT */}
              <div className="flex gap-10 lg:gap-50 2xl:gap-100 items-center">

                <h2 className="text-2xl w-50 mb-6">
                  Sport
                </h2>

                <select className="border border-gray-300 rounded-lg h-10 w-60 mb-6 px-4">

                  {venue?.sports?.map((sport, index) => (
                    <option key={index} value={sport}>
                      {sport}
                    </option>
                  ))}

                </select>

              </div>

              {/* DATE */}
              <div className="flex gap-10 lg:gap-50 2xl:gap-100 items-center">

                <h2 className="text-2xl w-50 mb-6">
                  Date
                </h2>

                <input
                  type="date"
                  className="border border-gray-300 rounded-lg h-10 w-60 mb-6 px-4"
                />

              </div>

              {/* START TIME */}
              <div className="flex gap-10 lg:gap-50 2xl:gap-100 items-center">

                <h2 className="text-2xl w-50 mb-6">
                  Start Time
                </h2>

                <input
                  type="time"
                  className="border border-gray-300 rounded-lg h-10 w-60 mb-6 px-4"
                />

              </div>

              {/* DURATION */}
              <div className="flex gap-10 lg:gap-50 2xl:gap-100 items-center">

                <h2 className="text-2xl w-50 mb-6">
                  Duration
                </h2>

                <div className="border border-gray-300 rounded-lg h-10 w-60 mb-6 px-4 flex items-center justify-between">

                  <button
                    onClick={() =>
                      setAddDuration(addDuration > 1 ? addDuration - 1 : 1)
                    }
                    className="text-2xl font-light"
                  >
                    -
                  </button>

                  <span className="text-lg">
                    {addDuration}
                  </span>

                  <button
                    onClick={() => setAddDuration(addDuration + 1)}
                    className="text-2xl font-light"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* SELECT COURT */}
              <div className="flex gap-10 lg:gap-50 2xl:gap-100 items-center">

                <h2 className="text-2xl w-50 mb-6">
                  Select Court
                </h2>

                <div className="border border-gray-300 rounded-lg h-10 w-60 mb-6 px-4">

                  <select
                    className="w-full h-full"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                  >

                    <option value="">
                      Select Court
                    </option>

                    {venue?.courtNumbers?.map((courtNumber, index) => (
                      <option key={index} value={courtNumber}>
                        {courtNumber}
                      </option>
                    ))}

                  </select>

                  <div className="mt-2 text-sm text-gray-600">

                    {selectedTable
                      ? `Selected Court: ${selectedTable}`
                      : "No court selected"}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    )
  );
};

export default VenueBooking;