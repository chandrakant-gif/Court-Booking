import express from 'express';
import auth from '../middlewares/auth.js';
import { checkAvailabilityApi, createBooking, getCourtBookings, getUserBookings } from '../controllers/bookingController.js';



const router = express.Router();

router.post('/check-availability', auth, checkAvailabilityApi)
router.post('/create-booking', auth, createBooking)
router.get('/user-bookings', auth, getUserBookings)
router.get('/court-bookings', auth, getCourtBookings)


export default router