import User from "../models/user.js";

const logout = async (req, res, next)=>{
  res.clearCookie('connect.sid')
  res.clearCookie('accessToken')
  res.status(200).json({ message: 'Logout successful', status: true });
}

export default logout;