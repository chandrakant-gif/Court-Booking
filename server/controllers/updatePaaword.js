import User from "../models/user.js";
import bcrypt from "bcrypt";
import resetToken from "../utils/resetToken.js";

const updatePassword = async (req, res, next) => {

  const { password } = req.body;

  try {

    const user = req.user;
    const hashedPassword = await bcrypt.hash(password, 10);

    


    if(!user){
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    


    user.password = hashedPassword;
    await user.save();
    res.clearCookie("resetToken");

    // res.clearCookie("accessToken")
    // res.clearCookie("connect-sid")
   

    return res.status(200).json({
      status: true,
      message: "Password updated successfully",
    })
      
    
  } catch (error) {
    
  }

}

export default updatePassword;
