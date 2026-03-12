import User from "../models/User.js";
import resetToken from "../utils/resetToken.js";

const verifyOtp = async (req, res, next) => {
  try {
    const { otp } = req.body;

    const user = await User.findOne({ "password_otp.otp": otp });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    // ✅ FIXED EXPIRY CHECK
    const isExpired = Date.now() > user.password_otp.send_time;
    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "OTP has expired",
      });
    }

    // Clear OTP
    user.password_otp = null;
    await user.save();

    const reset = resetToken(user.email);

    // ✅ FIX COOKIE FOR LOCALHOST
    res.cookie("resetToken", reset, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      status: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    next(error);
  }
};

export default verifyOtp;
