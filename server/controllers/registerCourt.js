import Court from "../models/Court.js";
import User from "../models/user.js";


const registerCourt = async (req, res, next) => {
  try {
    const {name, address, contact, city} = req.body
  
    const owner = req.user._id;
    
    const court = await Court.findOne({owner})
  
    if(court){
      return res.json({success: false, status: 409, message:"Your Court is Already Registered",
      hasCourt: true
      })
    }

    await Court.create({
      name,
      contact,
      address,
      city,
      owner
    })
    await User.findByIdAndUpdate(owner, {
  role: "owner"
})

    return res.json({
      status: 200,
      message: "Court is Registered Successfully",
      hasCourt: true
    })






  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    })
  }

}

// GET /court/my
const checkCourt = async(req, res, next) =>{
  const court = await Court.findOne({ owner: req.user._id });

res.json({
  success: true,
  hasCourt: !!court,
  court
});
}

const getRegisteredCourt = async(req,res,next) => {
  try {
      const court  = await Court.findOne({owner: req.user._id});

    if(!court){
      return res.json({
        success: false,
        message: "No court registered for this user"
      })
    }

    res.json({
      success: true,
      court : {
      courtName: court.name,
      courtAddress: court.address
      }
      
    })
    
  } catch (error) {
  
    res.json({
      success: false,
      message: error.message
    })
  }
}





export {registerCourt, checkCourt, getRegisteredCourt}