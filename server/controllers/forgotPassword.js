import User from "../models/user.js";
import sendmail from "../utils/sendmail.js";

const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email?.toLowerCase().trim();

    const user = await User.findOne({ email });

    // 1️⃣ STOP if user not found
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User with this email does not exist",
      });
    }

    // 2️⃣ ALWAYS initialize password_otp safely
    if (!user.password_otp) {
      user.password_otp = {};
    }

    if (typeof user.password_otp.limit !== "number") {
      user.password_otp.limit = 5;
    }

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const now = Date.now();

    // 3️⃣ Rate-limit reset after 24 hours
    if (user.password_otp.last_attempt) {
      const diff = now - new Date(user.password_otp.last_attempt).getTime();

      if (diff > ONE_DAY) {
        user.password_otp.limit = 5;
      }
    }

    // 4️⃣ Block if limit exhausted
    if (user.password_otp.limit <= 0) {
      return res.status(400).json({
        status: false,
        message: "OTP request limit exceeded. Try again later.",
      });
    }

    // 5️⃣ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.password_otp.otp = otp;
    user.password_otp.limit -= 1;
    user.password_otp.last_attempt = new Date();
    user.password_otp.send_time = Date.now() + 2 * 60 * 1000; // 2 min expiry

    await user.save();

    // 6️⃣ Send email
    await sendmail({ email, otp });

    // 7️⃣ ALWAYS respond
    return res.status(200).json({
      status: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    next(error);
  }
};

export default forgotPassword;
