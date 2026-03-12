import React, { useState } from "react";
import api from "../utils/api";
import httpAction from "../utils/httpAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isWeak, setIsWeak] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [error, setError] = useState("");

  const checkStrength = (value) => {
    const strongPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (strongPattern.test(value)) {
      setIsStrong(true);
      setIsWeak(false);
    } else {
      setIsWeak(true);
      setIsStrong(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkStrength(value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const data = {
      url : api().updatePassword,
      method: "POST",
      body: {password}

    }
    const result = await httpAction(data);
    if(result?.status){
      toast.success("Password updated successfully");
      navigate('/login');
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
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">
            Reset Password
          </h2>

          <p className="text-sm text-gray-500/90 mt-3 text-center">
            Create a new strong password for
            <span className="px-1 text-blue-500">QuickCourt</span>
          </p>

          {/* NEW PASSWORD */}
          <div className="flex items-center w-full mt-8 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7z"
                fill="#6B7280"
              />
            </svg>

            <input
              type="password"
              placeholder="New Password"
              value = {password}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* PASSWORD STRENGTH */}
          {isWeak && (
            <div className="w-full mt-2 text-sm text-red-500">
              <i className="fa-solid fa-circle-info mr-2"></i>
              Password is weak
            </div>
          )}
          {isStrong && (
            <div className="w-full mt-2 text-sm text-green-500">
              <i className="fa-solid fa-circle-info mr-2"></i>
              Strong password
            </div>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center w-full mt-5 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7z"
                fill="#6B7280"
              />
            </svg>

            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="w-full mt-2 text-sm text-red-500">
              <i className="fa-solid fa-circle-info mr-2"></i>
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Update Password
          </button>

          {/* BACK TO LOGIN */}
          <p className="text-gray-500/90 text-sm mt-4">
            Back to
            <a className="text-indigo-400 hover:underline ml-1" href="/login">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
