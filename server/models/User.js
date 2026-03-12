import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  role: { type: String, enum: ["player", "owner"], default: "player" },

  image: { type: String },

  password: { type: String },

  password_otp: { 
    otp: { type: String },
    send_time: { type: String },
    limit: { type: Number, default: 5 },
    last_attempt: {type: Object}
  },
  recentSearchedCities: [{type: String, required: true}]
},
{timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;