import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import ProfileMenu from "./Profile";
import api from "../../utils/api";
import httpAction from "../../utils/httpAction";
import { useAppContext } from "../../Context/App.Context";
import CourtReg from "./CourtReg";

const Navbar = ({user, setUser,}) => {

 const [showCourtReg, setShowCourtReg] = useState(false);
const { isOwner, setIsOwner } = useAppContext();

useEffect(() => {
  if (!user) return;

  if (user?.role?.toLowerCase() !== "owner") {
    setIsOwner(false);
  } else {
    setIsOwner(true);
  }
}, [user]);

  const navLinks = [{ name: "Book", path: "/bookings" }, {name: "My Bookings", path: "/mybookings"}];
  
  const navLinks2 = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }, ...(user ? (isOwner ? [{ name: "Dashboard", path: "/owner" }] : [{ name: "Register your Court", action: "register", highlight: true }]) : [])];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);



  // ---------- SIGN OUT ----------
   const logOutHandler = async () => {
      try {
        const data = {
          url: api().logOutUser,
        };
        await httpAction(data);
      } finally {
        setUser(null);
        navigate("/login");
      }
    };

  return (



    <nav
      className={`fixed  top-0 left-0 
      h-20 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32  backdrop-blur-md
      transition-all duration-500 z-50 shadow-sm bg-white  `}
    >
      {/* Logo */}
      <Link to="/">
        <h1
          className="bg-black bg-clip-text text-2xl font-bold text-transparent"
        >
          QuickCourt
        </h1>
      </Link>

      <div className="hidden md:flex items-center gap-4">
       
         {navLinks2.map((item, index) =>
  item.action === "register" ? (
    <button
      key={index}
      onClick={() => setShowCourtReg(true)}
      className="px-5 py-2 rounded-full bg-white text-black border hover:bg-black hover:text-white transition"
    >
      {item.name}
    </button>
  ) : (
    <Link
      key={index}
      to={item.path}
      className="px-5 py-2 rounded-full text-black hover:border bg-white/80"
    >
      {item.name}
    </Link>
  )
)}
       

      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/bookings"
          className={`px-4 py-2 rounded-sm text-black hover:border-none hover:bg-slate-200 bg-white-800 transition-all duration-100 bg-white/80`}
        >
          <i className="fa-solid pr-2 text-sm fa-book"></i>
          Book
        </Link>
      

          {!user && (<button
          onClick={()=> navigate('/login')}
            className={`px-5 py-2 rounded-sm bg-black text-white/90 cursor-pointer 
            hover:bg-white/80 hover:text-black
            border transition-all duration-100 `}
          >
            Login
          </button>)}
          {user && (<ProfileMenu user={user} setUser={setUser} />)}
        
      </div>
      {showCourtReg && (
    <CourtReg
    onClose={() => setShowCourtReg(false)}
    onSuccess={() => {
      setShowCourtReg(false)
      setIsOwner(true)
      navigate("/owner")
    }}
  />
)}

      
{/* Mobile Menu Button */}
<div className="flex items-center gap-3 md:hidden">
  <svg
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="h-6 w-6 cursor-pointer"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
</div>
    {/* Mobile Menu */}
<div
  className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <button
    className="absolute top-4 right-4"
    onClick={() => setIsMenuOpen(false)}
  >
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>

  {/* Main Links */}
  {navLinks2.map((item, index) =>
    item.action === "register" ? (
      <button
        key={index}
        onClick={() => {
          setShowCourtReg(true);
          setIsMenuOpen(false);
        }}
        className="px-6 py-3 rounded-full bg-black text-white"
      >
        {item.name}
      </button>
    ) : (
      <Link
        key={index}
        to={item.path}
        onClick={() => setIsMenuOpen(false)}
        className="text-lg"
      >
        {item.name}
      </Link>
    )
  )}

  {/* Booking Links */}
  {navLinks.map((link, i) => {user && (
    <Link
      key={i}
      to={link.path}
      onClick={() => setIsMenuOpen(false)}
      className="text-lg"
    >
      {link.name}
    </Link>
  )})}

  {/* Auth Buttons */}
  {!user && (
    <button
      onClick={() => {
        navigate("/login");
        setIsMenuOpen(false);
      }}
      className="bg-black text-white px-8 py-2.5 rounded-full"
    >
      Login & Sign Up
    </button>
  )}

  {user && (
    <button
      onClick={() => {
        logOutHandler();
        setIsMenuOpen(false);
      }}
      className="border text-red-800 hover:text-white hover:bg-red-800 px-8 py-2.5 rounded-full"
    >
      Sign Out
    </button>
  )}
</div>
    </nav>
  );
};

export default Navbar;
