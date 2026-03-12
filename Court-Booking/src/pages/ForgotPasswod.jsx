import React, { useState } from "react";
import api from "../utils/api";
import httpAction from "../utils/httpAction";
import { useNavigate } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";

const ForgotPassword = () => {

  const {navigate, setLoading, loading} = useGeneral();
  
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const data ={
      url: api().forgotPassword,
      method: "POST",
      body: {email}
    }
    
    try{
      setLoading(true);
      const result = await httpAction(data);

      setLoading(false);
      if(result?.status){
        setOtpSent(true);
        navigate('/otp-page');
        localStorage.setItem("email", email);
      }

    }catch(error){
      console.log("Failed to send OTP", error.message);
    }
   

    
    // if (!email) return;
    // setOtpSent(true);
  };

  return (
    <div className="flex h-screen w-full">

      {/* LEFT IMAGE */}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSendOtp}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">
            Forgot Password
          </h2>

          <p className="text-sm text-gray-500/90 mt-3 text-center">
            Enter your registered email to receive a verification OTP for
            <span className="px-1 text-blue-500">QuickCourt</span>
          </p>

          {/* EMAIL INPUT */}
          <div className="flex items-center w-full mt-8 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>

            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* OTP MESSAGE */}
          {otpSent && (
            <div className="w-full mt-3 text-sm text-green-500 flex items-center">
              <i className="fa-solid fa-circle-info mr-2"></i>
              OTP has been sent to your email
            </div>
          )}

          {/* SEND OTP BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
           {loading ? (
              <>
                
                <span>Sending...</span>
              </>
            ) : (
              <span>Get OTP</span>
            )}
          </button>

          {/* BACK TO LOGIN */}
          <p className="text-gray-500/90 text-sm mt-4">
            Remember your password?
            <a
              className="text-indigo-400 hover:underline ml-1"
              href="/login"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
