import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generarteToken.js";

const login = async (req, res, next) => {
  const {email, password} = req.body;

  try{
    const findedUser = await User.findOne({ email: email});
    if(!findedUser){
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(password, findedUser.password);
    if(!isPasswordCorrect){
      const error = new Error('Invalid credentials');
      error.status = 400;
      throw error;
    }

    const accessToken = generateToken(findedUser._id,findedUser.email,findedUser.role);

    res.cookie('accessToken', accessToken, {
      httpOnly: true, 
      secure: true, 
      sameSite: 'none'
    });

    res.status(200).json({
      menubar: 'Login successful',
      status: true,
      user: {
      _id: findedUser._id,
      email: findedUser.email,
      role: findedUser.role,
    }
    })

  } catch(err){
    next(err);
  }


}

export default login;