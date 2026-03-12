import  jwt  from "jsonwebtoken";
import User from "../models/user.js";

const protectReset = async (req, res, next) => {
 try {
   const resetToken = req.cookies.resetToken;
 
   if (!resetToken) {
     return res.status(401).json({ message: "Reset access denied" });
   }
 
   const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET)
   
    const user = await User.findOne({ email: decoded.email });
     if (!user) {
       return res.status(401).json({ message: "User not found" });
     }
 
 
   req.user = user;
   next();
 } catch (error) {
  error.status = 401;
    next(error);
 }
};

export default protectReset
