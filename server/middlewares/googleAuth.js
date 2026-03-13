import User from '../models/User.js';
import generateToken from '../utils/generarteToken.js';


const googleAuth = async (req, res, next) => {
  try{
    const findedUser = await User.findOne({ email: req.user?._json?.email });
    let savedUser;
      if(!findedUser){
        const newUser = new User({
          name: req.user?._json?.name,
          email: req.user?._json?.email,
      });
      savedUser = await newUser.save();

}

  const user = findedUser ? findedUser : savedUser;

const accessToken = generateToken(
  user._id,
  user.email,
  user.role
);

  res.cookie('accessToken', accessToken, {httpOnly: true, secure: false, sameSite: 'lax'} );

    next(); 
}catch(err){
    next(err)
  }}

export default googleAuth;