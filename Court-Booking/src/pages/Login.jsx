import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import httpAction from "../utils/httpAction";

const Login = ({user, setUser}) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handlePasswordChange = (e) => {
    setLoginData({
      ...loginData,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      url: api().loginUser,
      method: "POST",
      body: loginData,
    };

    try {
      const result = await httpAction(data);
      

      if (result?.status) {
        const loggedInUser = result.user;
         if (!loggedInUser) {
        throw new Error("User not returned from API");
      }

      setUser(loggedInUser);

       if (loggedInUser.role.toLowerCase() === "owner") {
        navigate("/owner");
      } else {
        navigate("/");
      }
        

        
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT IMAGE */}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500 mt-3 text-center">
            Welcome back! Please sign in to continue with
            <span className="text-blue-500 px-1">QuickCourt</span>
          </p>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 cursor-pointer rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          {/* OR DIVIDER */}
          <div className="flex items-center w-full my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              or sign in with email
            </span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* EMAIL INPUT */}
          <div className="flex items-center w-full h-12 border rounded-full px-5 gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
            </svg>

            <input
              type="email"
              placeholder="Email address"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full outline-none text-sm bg-transparent"
              required
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="flex items-center w-full h-12 border rounded-full px-5 gap-2 mt-4">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.657 0 3 1.343 3 3v3H9v-3c0-1.657 1.343-3 3-3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 11V7a5 5 0 0110 0v4"
              />
            </svg>

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handlePasswordChange}
              className="w-full outline-none text-sm bg-transparent"
              required
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="w-full flex justify-end mt-4 text-sm text-gray-500">
            <Link to="/forgot-password" className="underline">
              Forgot password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition"
          >
            Login
          </button>

          {/* SIGNUP LINK */}
          <p className="text-sm mt-4 text-gray-500">
            Don’t have an account?
            <Link to="/signup" className="text-indigo-400 ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
