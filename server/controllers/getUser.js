import User from "../models/User.js";

const getUser = async (req, res, next) => {
  try {
    const email = req.email;

    if (!email) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "success",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.image,
        recentSearchedCities: user.recentSearchedCities
        
      },
    });
  } catch (err) {
    next(err);
  }
};

const storeRecentSearchCities = async (req, res) => {
  try {
    const {recentSearchedCity} = req.body;
    const user = req.email;

    if(user.recentSearchedCities < 3){
      user.recentSearchedCities.push(recentSearchedCity)
    }else{
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCity)
    }
    await user.save();
    res.json({success: true, message: "City added"})
  } catch (error) {
     res.json({success: false, message: error.message})
  }
}



export  {getUser, storeRecentSearchCities};
