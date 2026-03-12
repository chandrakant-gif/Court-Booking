import CourtDetails from "../models/CourtDetailsSchema.js";
import Court from "../models/Court.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


export const createCourt = async(req, res, next) => {
  try {
  const owner = req.user._id;
  let {sportEnvironment, sportName, pricing, amenities} = req.body;
  pricing = JSON.parse(pricing);
  amenities = JSON.parse(amenities);


  const court = await Court.findOne({owner})

  if(!court){
    return res.json({success: false, message: "Court not found"})
  }

 let images = [];

  if (req.files && req.files.length > 0) {
    const uploadImages = req.files.map(async (file) => {
      const response = await uploadOnCloudinary(file.path);
      return response.secure_url;
    });
    images = await Promise.all(uploadImages);
  }

  
  const exists = await CourtDetails.findOne({
    court: court._id,
    sportName
  });

  if (exists) {
    return res.status(409).json({
      status: false,
      message: "Sport already exists for this court"
    });
  }

  if (!Array.isArray(pricing) || pricing.length === 0) {
    return res.status(400).json({
    message: "Pricing is required"
    });
  }

  if (!Array.isArray(amenities)) {
    return res.status(400).json({
      message: "Amenities must be an array"
    });
  }

  for (const slot of pricing) {
  const { slotName, startTime, endTime, pricePerHour } = slot;

  if (!slotName || !startTime || !endTime || !pricePerHour) {
    return res.status(400).json({
      message: "All pricing fields are required"
    });
  }

  if (startTime >= endTime) {
    return res.status(400).json({
      message: `Invalid time range for ${slotName}`
    });
  }

  if (pricePerHour <= 0) {
    return res.status(400).json({
      message: "Price must be greater than 0"
    });
  }
}
  const slotNames = pricing.map(p => p.slotName);
  const unique = new Set(slotNames);

  if (unique.size !== slotNames.length) {
    return res.status(400).json({
      message: "Duplicate slot names not allowed"
    });
  }

  const sorted = [...pricing].sort(
    (a, b) => a.startTime.localeCompare(b.startTime)
  );

  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].endTime > sorted[i + 1].startTime) {
      return res.status(400).json({
        message: "Pricing slots overlap"
      });
    }
  }
  const cleanedAmenities = [
  ...new Set(amenities.map(a => a.trim()).filter(Boolean))
];



  const courtDetails = await CourtDetails.create({
    court: court._id,
    sportEnvironment,
    sportName,
    images,
    amenities: cleanedAmenities,
    pricing
  })

   res.status(201).json({
      success: true,
      message:"room created succesfully"
    });



    
  } catch (error) {
    next(error)
  }
}

export const getCourt = async(req, res, next) => {
  try {
    const courts = await CourtDetails.find({isAvailable: true}).populate({
      path:'court',
      populate:{
        path: 'owner',
        select: 'image' 
      }
    }).sort({createdAt: -1})
    res.json({success: true, courts})
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}

export const getOwnerCourts =  async (req, res, next) => {
  try {
    const court = await Court.findOne({owner: req.user._id})
    const courtDetails = await CourtDetails.find({court: court._id.toString()}).populate("court")

    res.json({success: true, courtDetails})
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}

export const toggleCourtAvailability = async (req, res, next) => {
  try {
    const {courtId} = req.body;
    const court = await CourtDetails.findById(courtId);
    court.isAvailable = !court.isAvailable;
    await court.save();

    res.json({success: true, message: "romm availability updated"})
  } catch (error) {
      return res.json({success: false, message: error.message})
  }
}