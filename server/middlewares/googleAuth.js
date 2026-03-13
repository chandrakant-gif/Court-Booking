import User from '../models/User.js';
import generateToken from '../utils/generarteToken.js';

const googleAuth = async (req, res, next) => {
  try {

    const email = req.user?.emails?.[0]?.value;
    const name = req.user?.displayName;

    if (!email) {
      throw new Error("Google email not found");
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email
      });
    }

    const accessToken = generateToken(
      user._id,
      user.email,
      user.role
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    next();

  } catch (err) {
    next(err);
  }
};

export default googleAuth;