

const api = () => {
  const local = 'http://localhost:5000/';

  const list = {
    registerUser: `${local}api/user/signup`,
    loginUser: `${local}api/user/login`,
    userProfile: `${local}api/user/profile`,
    logOutUser: `${local}api/user/logout`,
    getAccess: `${local}api/user/access`,
    forgotPassword: `${local}api/user/forgot-password`,
    verifyOtp: `${local}api/user/verify-otp`,
    getTime: `${local}api/user/otp/time`,
    updatePassword: `${local}api/user/reset-password`,
    resetAccess: `${local}api/user/reset-access`,

   registerCourt: `${local}api/court/register-court`,
   myCourt: `${local}api/court/check-court`,
   getRegisteredCourt: `${local}api/court/get-registered-court`,

   addCourt : `${local}api/court/add-court`,
   ownerCourts : `${local}api/court/get-owner-court`,
   toggleCourtAvailability : `${local}api/court/toggle-availability`,

   getCourtBookings : `${local}api/booking/court-bookings`,
   getCourts : `${local}api/court/get-court`,
   storeRecentSearch : `${local}api/user/store-recent-search`,
   checkAvailability : `${local}api/booking/check-availability`,
   createBooking : `${local}api/booking/create-booking`,
   getUserBookings : `${local}api/booking/user-bookings`,
    

  };
  return list;
}

export default api;