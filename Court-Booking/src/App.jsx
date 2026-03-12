import React, {useState, useEffect}from 'react'
import Navbar from './components/home/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/home/Footer';
import Bookings from './pages/Bookings';
import { cities } from './assets/quickStay-assets/assets/assets';
import VenueDetails from './pages/VenueDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp.jsx';
import VenueBooking from './pages/VenueBooking';
import MyBookings from './pages/MyBookings';
import CourtReg from './components/home/CourtReg';
import Layout from './pages/courtOwner/Layout';
import Dashboard from './pages/courtOwner/Dashboard';
import AddCourt from './pages/courtOwner/AddCourt';
import ListCourt from './pages/courtOwner/ListCourt';
import Otppage from './pages/Otppage.jsx';
import ForgotPassword from './pages/ForgotPasswod.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import { Toaster } from "react-hot-toast";
import Super from './components/home/Super.jsx';
import ResetGuard from './components/home/ResetGuard.jsx';
import api from './utils/api.js';
import httpAction from './utils/httpAction.js';
import OwnerRoute from './components/OwnerRoute.jsx';

import { useNavigate } from 'react-router-dom';





function App() {
const navigate = useNavigate()
const [city, setCity] = useState("");
const [resetToken, setResetToken] = useState("")

const [filteredCities, setFilteredCities] = useState([]);

  const handleChange = (e) => {
    const input = e.target.value;
    setCity(input);

    
    if (input.length > 0) {
      const filtered = cities.filter((c) =>
        c.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }

  const handleSelect = (city) => {
    setCity(city);
    setFilteredCities([]);
  };

  const location = useLocation();
  const authPages = ["/login", "/signup","/otp-page","/forgot-password","/reset-password"].includes(location.pathname);






  //user from datatbase
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const data ={
          url: api().userProfile
        }
        const result = await httpAction(data);
        
        if (result?.user) {
          setUser(result.user);
        
        }
      } catch(error) {
      
        setUser(null);
      } finally {
      setLoading(false); // 🔑 REQUIRED
    }
    };
    getUser();
  }, []);

  



  if (loading) {
  return <div>Loading...</div>;

    
}

  return (
    
      
    
  
    <div>
      <Toaster position="top-center" reverseOrder={false} />


      {!authPages && <Navbar user={user} setUser={setUser}/> }
      <div className='min-h-[70vh]'>
         {/* {true && <CourtReg/>} */}
        <Routes>
      {/*PUBLIC*/}
          <Route path='/login' element={<Login setUser={setUser} user={user}/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/otp-page' element={<Otppage resetToken={resetToken} setResetToken={setResetToken}/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route element={<ResetGuard />}>
            <Route path='/reset-password' element={<ResetPassword />} />
          </Route>

         <Route
  path="/about"
  element={
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 bg-gray-50 min-h-screen flex justify-center">
      
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-10">

        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          About QuickStay
        </h1>

        <p className="text-gray-600 text-lg leading-8 text-center">
          QuickStay is your go-to platform for hassle-free court bookings.
          Whether you're a player looking for the perfect spot to play or a
          court owner wanting to manage your venue, QuickStay has got you
          covered.
        </p>

        <p className="text-gray-600 text-lg leading-8 mt-6 text-center">
          With an easy-to-use interface, secure payments, and a wide range of
          courts to choose from, we make booking your next game a breeze.
        </p>

        <p className="text-gray-600 text-lg leading-8 mt-6 text-center">
          Join us today and experience the convenience of QuickStay.
        </p>

      </div>

    </div>
  }
/>

        <Route path='/' 
         element={
         <Home 
         city={city} 
         setCity={setCity} 
         filteredCities={filteredCities} setFilteredCities={setFilteredCities} 
         handleChange={handleChange} handleSelect={handleSelect} 
         user={user}
         setUser={setUser}/>}/>
      {/* PLAYER / USER */}
        

          <Route 
          path='/bookings' 
          element={
          <Bookings 
          city={city} 
          setCity={setCity} 
          filteredCities={filteredCities} setFilteredCities={setFilteredCities} 
          handleChange={handleChange} handleSelect={handleSelect}/>}/>

        <Route element={<Super/>}>
          <Route path='/mybookings' element={<MyBookings/>}/>
          {/* <Route path='/venue/:id/booking' element={<VenueBooking/>}/> */}
        </Route>

         <Route path='/venue/:id' element={<VenueDetails/>}/>
         



          {/* OWNER ONLY */}

        <Route element={<OwnerRoute user={user} />}>
        <Route path='/owner' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='/owner/add-court' element={<AddCourt/>}/>
        <Route path='/owner/list-courts' element={<ListCourt/>}/>
        </Route>
        </Route>



     
       
       

       

     
    </Routes>

    </div>
      {!authPages  && <Footer/>}
    </div>
  )
}

export default App