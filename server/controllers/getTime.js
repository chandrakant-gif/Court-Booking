import User from "../models/user.js";


const getTime = async (req, res, next) => {
  const  { email } = req.body;
  try{

    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    const time = user.password_otp.send_time

    return res.status(200).json({
      status: true,
      time: time,
    });
  }catch(error){}
}
export default getTime;