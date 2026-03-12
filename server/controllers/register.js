import User from '../models/user.js';
import bcrypt from 'bcrypt';
import uploadOnCloudinary from '../utils/cloudinary.js';

const register = async (req, res, next) => {
  const {name, email, password} = req.body;


  try{
     if (!password) {
      return res.status(400).json({ message: "Password missing" });
    } 
    const findedEmail = await User.findOne({ email: email});

    if(findedEmail){
      const error = new Error('Email already registered');
      error.status = 404;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    let imageUrl = "";

    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      if (uploaded) {
        imageUrl = uploaded.secure_url;
      }
    }
    console.log(imageUrl)
    

    

    const newUser = new User({
      name, email,
      password: hashedPassword,
      image: imageUrl
    })

    const savedUser = await newUser.save();
    res
    .status(200)
    .json({ message: 'User registered successfully', status: true });
    
    


  }catch(err){
  next(err)

  }
}
export default register;