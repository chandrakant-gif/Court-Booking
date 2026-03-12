import React, { useEffect, useState } from 'react'
import Title from '../components/home/Title'
import { assets } from '../assets/quickStay-assets/assets/assets'
import { useAppContext } from '../Context/App.Context'
import api from '../utils/api'
import httpAction from '../utils/httpAction'
import toast from 'react-hot-toast'

const MyBookings = () => {

  const { user } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchUserBookings = async () => {
    try {

      const data = {
        url: api().getUserBookings,
      }

      const result = await httpAction(data)

      if (result.success) {
        setBookings(result.bookings)
      } else {
        toast.error(result.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  /* -------- PAY BOOKING -------- */

  const handlePayment = async (bookingId) => {

    try {

      const data = {
        url: api().payBooking,
        method: "POST",
        body: { bookingId }
      }

      const result = await httpAction(data)

      if (result.success) {

        toast.success("Payment successful")
        fetchUserBookings()

      } else {

        toast.error(result.message)

      }

    } catch (error) {

      toast.error(error.message)

    }

  }

  useEffect(() => {

    if (user) {
      fetchUserBookings()
    }

  }, [user])

  return (

    <div className='py-28 md:py-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>

      <Title
        title="My Bookings"
        subTitle="Manage your court bookings"
        align="left"
        font="semibold"
      />

      <div className='max-w-6xl mt-8 w-full text-gray-700'>

        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
          <div>Courts</div>
          <div>Date & Time</div>
          <div>Payment</div>
        </div>

        {bookings.map((booking, index) => (

          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'
          >

            {/* COURT DETAILS */}

            <div className='flex flex-col md:flex-row'>

              <img
                src={booking.sport?.images[0]}
                alt=""
                className='min-md:w-44 rounded shadow object-cover'
              />

              <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>

                <p className='font-playfair text-2xl'>
                  {booking.court?.name}
                  <span className='font-inter text-sm'>
                    ({booking.sport?.sportEnvironment})
                  </span>
                </p>

                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <img src={assets.locationIcon} alt="" />
                  <span>{booking.court?.address}</span>
                </div>

                <p className='text-base'>
                  Total: ₹{booking.totalPrice}
                </p>

              </div>

            </div>


            {/* DATE TIME */}

            <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>

              <div>
                <p>Start:</p>
                <p>{new Date(booking.checkInDate).toLocaleTimeString()}</p>
              </div>

              <div>
                <p>End:</p>
                <p>{new Date(booking.checkOutDate).toLocaleTimeString()}</p>
              </div>

            </div>


            {/* PAYMENT */}

            <div className='flex flex-col items-start justify-center pt-3'>

              <div className='flex items-center gap-2'>

                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>

                <p
                  className={`text-sm ${
                    booking.isPaid ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {booking.isPaid ? 'Paid' : 'Pending Payment'}
                </p>

              </div>

              {/* PAY NOW BUTTON */}

              {!booking.isPaid && (

                <button
                  onClick={() => handlePayment(booking._id)}
                  className='mt-3 bg-white text-black border px-4 py-2 rounded-lg cursor-pointer'
                >
                  Pay Now
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default MyBookings