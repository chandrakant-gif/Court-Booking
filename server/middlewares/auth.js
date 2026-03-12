import  jwt  from "jsonwebtoken";
const auth = (req, res, next) => {
  try{
    const accesstoken = req.cookies.accessToken;

    if (!accesstoken) {
      return res.status(401).json({
        status: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
    req.email = decoded.email; 
    req.user = {
      _id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    
    next();
  } catch(err){
    next(err);
  } 
}
export default auth;