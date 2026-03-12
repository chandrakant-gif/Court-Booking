import Booking from "../models/Bookings.js";
import CourtDetails from "../models/CourtDetailsSchema.js";
import Court from "../models/Court.js";
import transporter from "../config/nodemailer.js";

const checkAvailability = async({checkInDate, checkOutDate, sport}) => {
  try {
    const bookings = await Booking.find({
      sport,
      checkInDate: { $lt: checkOutDate },
      checkOutDate: { $gt: checkInDate }
    });
    const isAvailable = bookings.length === 0
    return isAvailable

  } catch (error) {
    console.error("Error checking availability:", error);
  }

}

export const checkAvailabilityApi = async (req, res) => {
  try {

    const { checkInDate, checkOutDate, sport } = req.body;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      sport
    });

    res.json({
      success: true,
      available: isAvailable
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createBooking = async (req, res) => {
  try {

    const { sport, checkInDate, checkOutDate, paymentMethod } = req.body;
    const user = req.user._id;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      sport
    });

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Court not available for selected time"
      });
    }

    const sportData = await CourtDetails
      .findById(sport)
      .populate("court");

    const pricePerHour = sportData.pricing?.[0]?.pricePerHour || 0;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const timeDiff = checkOut.getTime() - checkIn.getTime();

    const hours = Math.ceil(timeDiff / (1000 * 60 * 60));

    const totalPrice = pricePerHour * hours;

    await Booking.create({
      user,
      sport,
      court: sportData.court._id,
      checkInDate,
      checkOutDate,
      totalPrice,
      paymentMethod
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Booking Confirmation",
      html:`
      <h2>Your Booking Deatails</h2>
      <p>Dear ${req.user.name}</p> 
      <p>Thank you for your booking. Here are your booking details:</p>
      <ul>
      <li><strong>Sport:</strong> ${sportData.sport}</li>
      <li><strong>Court Name:</strong> ${sportData.court.name}</li>
      <li><strong>Check-In Date:</strong> ${new Date(checkInDate).toLocaleString()}</li>
      <li><strong>Check-Out Date:</strong> ${new Date(checkOutDate).toLocaleString()}</li>
      <li><strong>Total Price:</strong> $${totalPrice}</li>
      </ul>

      `
    });
    res.json({
      success: true,
      message: "Booking created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getUserBookings =async(req, res, next) => {
  try {
    const user = req.user._id;;
    const bookings = await Booking.find({user}).populate("sport").populate("court").sort({createdAt: -1})
    res.json({success: true, bookings})
  } catch (error) {
    res.json({success: false, message: "Failed to fetc bookings"})  
  }
};

export const getCourtBookings = async(req, res, next) => {
  try {
    const court = await Court.findOne({owner: req.user._id})
    if(!court){
      return res.json({success: false, message: "No Court found"});
    }
    const bookings = await Booking.find({court: court._id}).populate("sport court user").sort({createdAt: -1});
  
    const totalBookings = bookings.length;
  
    const totalRevenue = bookings.reduce((total, booking) => total + booking.totalPrice, 0);
  
    res.json({success: true, dashboardData: {bookings, totalBookings, totalRevenue}})
  } catch (error) {
    res.json({success: false, message: error.message})
  }

}

// export const stripePayment = async(req, res) => {
//   try {
//     const {bookingId} = req.body;

//     const booking = await Booking.findById(bookingId);
//     const courtData = await Court.findById(booking.court).populate('sport');
//     const totalPrice = booking.totalPrice;

//     const origin = req. headers;

//   } catch (error) {
    
//   }
// }