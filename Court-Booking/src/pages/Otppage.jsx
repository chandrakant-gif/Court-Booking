import React, { useState, useRef, useEffect } from "react";
import api from "../utils/api";
import httpAction from "../utils/httpAction";
import { useNavigate } from "react-router-dom";

const Otppage = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  // TIMER STATE
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  // 🔁 TIMER EFFECT (CORRECT)
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    setCanResend(false);

    const timer = setTimeout(() => {
      setTimeLeft((prev) => Math.max(prev - 1000, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // INPUT HANDLERS
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // VERIFY OTP
  const submitHandler = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    const data = {
      url: api().verifyOtp,
      method: "POST",
      body: { otp: otpValue },
    };

    const result = await httpAction(data);
    if (result?.status) {
      navigate("/reset-password");
    }
  };

  // 🔁 GET TIMER FROM BACKEND
  const getTimer = async () => {
    const data = {
      url: api().getTime,
      method: "POST",
      body: { email: localStorage.getItem("email") },
    };

    const result = await httpAction(data);
    if (result?.status) {
      const remaining = result.time - Date.now();
      setTimeLeft(Math.max(remaining, 0));
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    getTimer();
  }, []);

  // 🔁 RESEND OTP (LOGIC-AWARE)
  const resendOpt = async () => {
    if (!canResend) return;

    const data = {
      url: api().forgotPassword,
      method: "POST",
      body: { email: localStorage.getItem("email") },
    };

    const result = await httpAction(data);
    if (result?.status) {
      getTimer(); // fetch new send_time
    }
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
      <div className="w-full flex items-center justify-center">
        <div className="w-[360px] rounded-2xl p-8 text-black text-center">

          <h2 className="tracking-widest text-2xl mb-2">QUICKCOURT</h2>
          <p className="text-slate-600 text-sm mb-4">Verify your email</p>

          {/* OTP INPUTS */}
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-11 h-11 border border-zinc-400 rounded-lg text-center text-lg outline-none"
              />
            ))}
          </div>

          {/* VERIFY BUTTON */}
          <button
            onClick={submitHandler}
            className="w-full py-3 border rounded-xl hover:bg-zinc-800 hover:text-white transition"
          >
            Verify & Continue
          </button>

          {/* RESEND SECTION */}
          <div className="mt-5 text-sm text-slate-500 text-center space-y-2">
            {!canResend ? (
              <>
                <p>Resend OTP available in</p>
                <p className="font-semibold text-gray-700">
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              </>
            ) : (
              <button
                onClick={resendOpt}
                className="text-indigo-500 font-medium hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Otppage;
