import mongoose from "mongoose";

const sportDetailsSchema = new mongoose.Schema({
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Court",
    required: true
  },

  sportEnvironment: {
    type: String,
    enum: ["indoor", "outdoor"]
  },

  sportName: {
    type: String,
    required: true
  },

  images: [{
    type: String
  }],

  pricing: [
  {
    slotName: {
      type: String,
      enum: ["morning", "evening", "night"],
      required: true
    },
    startTime: {
      type: String, // "06:00"
      required: true
    },
    endTime: {
      type: String, // "10:00"
      required: true
    },
    pricePerHour: {
      type: Number,
      required: true
    }
  }
],
  amenities: {
    type: [String],
  },


  isAvailable: {
    type: Boolean,
    default: true
  }
},{timestamps: true})

sportDetailsSchema.index(
  { court: 1, sportName: 1 },
  { unique: true }
);

const CourtDetails = mongoose.model("CourtDetails", sportDetailsSchema)

export default CourtDetails;