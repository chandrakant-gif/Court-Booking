import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/quickStay-assets/assets/assets";
import { reviews } from "../assets/quickStay-assets/assets/assets";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/App.Context";
import toast from "react-hot-toast";
import api from "../utils/api";
import httpAction from "../utils/httpAction";

const VenueDetails = () => {

  const { id } = useParams();
  const { courts } = useAppContext();
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const [venue, setVenue] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const checkAvailability = async () => {
  try {

    if (!checkInDate || !checkOutDate) {
      return toast.error("Please select start and end time");
    }

    if (checkInDate >= checkOutDate) {
      return toast.error("End time must be after start time");
    }

    const startTime = venue?.pricing?.[0]?.startTime;
    const endTime = venue?.pricing?.[0]?.endTime;

    // check operating hours
    if (checkInDate < startTime || checkOutDate > endTime) {
      return toast.error(
        `Booking must be between ${startTime} and ${endTime}`
      );
    }

    // convert to datetime
    const today = new Date().toISOString().split("T")[0];

    const startDateTime = `${today}T${checkInDate}`;
    const endDateTime = `${today}T${checkOutDate}`;

    const data = {
      url: api().checkAvailability,
      method: "POST",
      body: {
        sport: id,
        checkInDate: startDateTime,
        checkOutDate: endDateTime
      }
    };

    const result = await httpAction(data);

    if (result?.success) {
      if (result.available) {
        setIsAvailable(true);
        toast.success("Court is available");
      } else {
        setIsAvailable(false);
        toast.error("Court is not available");
      }
    }

  } catch (error) {
    toast.error(error.message);
  }
};

  /* ---------- BOOKING ---------- */

  const onSubmitHandler = async (e) => {
    try {

      e.preventDefault();

      const today = new Date().toISOString().split("T")[0];

      const startDateTime = `${today}T${checkInDate}`;
      const endDateTime = `${today}T${checkOutDate}`;

      if (!isAvailable) {
        return checkAvailability();
      }

      const data = {
        url: api().createBooking,
        method: "POST",
        body: {
          sport: id,
          checkInDate: startDateTime,
          checkOutDate: endDateTime,
          paymentMethod: "pay at court"
        }
      };

      const result = await httpAction(data);

      if (result.success) {
        toast.success(result.message);
        navigate("/mybookings");
        scrollTo(0, 0);
      } else {
        toast.error(result.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------- IMAGE SCROLL ---------- */

  const scrollRef = useRef(null);

  const scroll = (direction) => {

    if (!scrollRef.current) return;

    const width = scrollRef.current.offsetWidth;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth"
    });

  };

  /* ---------- LOAD VENUE ---------- */

  useEffect(() => {

    if (!courts) return;

    const foundVenue = courts.find((court) => court._id === id);

    if (foundVenue) setVenue(foundVenue);

  }, [courts, id]);

  const handleLoadMore = () => setVisibleCount(reviews.length);
  const handleShowLess = () => setVisibleCount(3);

  if (!venue) {
    return <div className="pt-40 text-center text-gray-500">Loading venue...</div>;
  }

  return (

    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl">{venue.sportName}</h1>

        <div className="flex gap-3 py-2">

          <div className="flex gap-1">
            <img src={assets.locationIcon} />
            <span className="text-sm text-gray-500">
              {venue.court?.city}
            </span>
          </div>

          <div className="flex gap-1">
            <img src={assets.starIconFilled} />
            <span className="text-sm text-gray-500">
              4.2
            </span>
          </div>

        </div>

      </div>

      {/* IMAGES */}

      <div className="flex flex-col lg:flex-row mt-7">

        <div className="relative max-w-3xl shadow-md rounded-3xl">

          <button
            onClick={() => scroll("left")}
            className="absolute left-10 top-1/2 -translate-y-1/2 z-10"
          >
            <i className="text-4xl text-white fa-solid fa-circle-arrow-left"></i>
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-scroll no-scrollbar scroll-smooth"
          >

            {venue.images?.map((img, index) => (

              <img
                key={index}
                src={img}
                className="flex-shrink-0 w-full h-[400px] object-cover rounded-3xl"
              />

            ))}

          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-10"
          >
            <i className="text-4xl text-white fa-solid fa-circle-arrow-right"></i>
          </button>

        </div>

        {/* BOOK PANEL */}

        <div className="mt-5 md:pl-10 flex flex-col gap-5 w-full">

          <div className="shadow-sm bg-white flex flex-col justify-center pl-6 border border-gray-100 h-24 rounded-xl">

            <div className="text-gray-700 flex items-center gap-2">
              <i className="fa-solid fa-clock"></i>
              <span>Operating Hours</span>
            </div>

            <span className="text-gray-500">
              {venue?.pricing?.[0]?.startTime} - {venue?.pricing?.[0]?.endTime}
            </span>

          </div>

          <div className="shadow-sm bg-white flex flex-col justify-center pl-6 border border-gray-100 h-24 rounded-xl">

            <div className="text-gray-700 flex items-center gap-2">
              <i className="fa-solid fa-clock"></i>
              <span>Price Per Hour</span>
            </div>

            <span className="text-gray-500">
              ₹{venue?.pricing?.[0]?.pricePerHour}
            </span>

          </div>

          {/* BOOKING FORM */}

          <form onSubmit={onSubmitHandler} className="bg-white shadow-md rounded-xl p-4 mt-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Start Time</label>
                <input
                  type="time"
                  onChange={(e)=>{
                    setCheckInDate(e.target.value);
                    setIsAvailable(false);
                  }}
                  className="border border-gray-200 rounded-lg h-11 px-3 outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">End Time</label>
                <input
                  type="time"
                  onChange={(e)=>{
                    setCheckOutDate(e.target.value);
                    setIsAvailable(false);
                  }}
                  className="border border-gray-200 rounded-lg h-11 px-3 outline-none"
                />
              </div>

              <div className="flex items-end">

                <button
                  type="submit"
                  className="w-full h-11 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
                >
                  {isAvailable ? "Book Now" : "Check Availability"}
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>
      <div className="mt-20">

  {courts.filter(
    (court) =>
      court.court?._id === venue.court?._id && court._id !== venue._id
  ).length > 0 && (

    <>
      <h1 className="text-xl lg:text-2xl font-semibold">
        Other Sports Available
      </h1>

      <div className="flex flex-wrap gap-5 mt-10">

        {courts
          .filter(
            (court) =>
              court.court?._id === venue.court?._id && court._id !== venue._id
          )
          .map((court) => (

            <div
              key={court._id}
              onClick={() => {
                navigate(`/venue/${court._id}`);
                scrollTo(0,0);
              }}
              className="relative rounded-2xl w-[250px] h-52 cursor-pointer hover:scale-[1.03] transition"
            >

              <img
                src={court.images?.[0]}
                className="absolute rounded-2xl object-cover h-full w-full"
              />

              <h1 className="absolute text-white left-6 bottom-6">
                {court.sportName} ({court.sportEnvironment})
              </h1>

            </div>

          ))}

      </div>
    </>
  )}

</div>


{/* AMENITIES */}
<div className="mt-20">

  <h1 className="text-xl lg:text-2xl font-semibold">
    Amenities
  </h1>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">

    {venue.amenities?.map((amenity, index) => (

      <div key={index} className="text-gray-600 text-sm">

        <i className="fa-regular pr-1 fa-circle-check"></i>
        {amenity}

      </div>

    ))}

  </div>

</div>


{/* DESCRIPTION */}
<div className="mt-20">

  <h1 className="text-xl lg:text-2xl font-semibold">
    Venue Description
  </h1>

  <div className="mt-5 text-gray-600 leading-7">

    <i className="fa-solid fa-location-dot mr-2"></i>
    {venue.court?.address}

    <div className="text-sm mt-2">
      <i className="fa-solid pr-2 fa-phone"></i>
      {venue.court?.contact}
    </div>

  </div>

</div>


{/* REVIEWS */}
<div className="mt-20">

  <h1 className="text-xl md:text-2xl font-semibold">
    Reviews
  </h1>

  <div className="mt-5">

    {reviews.slice(0, visibleCount).map((review, index) => (

      <div key={index} className="bg-gray-100 p-4 rounded-xl mb-3">

        <div className="flex items-center gap-1">

          <span>{review.user}</span>

          <span>·</span>

          <img src={assets.starIconFilled} />

          <span className="text-sm text-gray-500">
            {review.rating}
          </span>

        </div>

        <div className="mt-2">{review.comment}</div>

      </div>

    ))}

  </div>

  <div className="flex justify-center mt-5">

    {visibleCount < reviews.length && (
      <button
        onClick={handleLoadMore}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Load More
      </button>
    )}

    {visibleCount === reviews.length && (
      <button
        onClick={handleShowLess}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Show Less
      </button>
    )}

  </div>

</div>

    </div>

  );

};

export default VenueDetails;