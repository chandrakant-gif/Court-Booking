import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true 
},

 contact: {
  type: String,
  required: true
},

 address: {
  type: String,
  required: true
},

 city: {
  type: String,
  required: true
},

owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}


},
{timestamps: true})

const Court = mongoose.model('Court', courtSchema);

export default Court;






