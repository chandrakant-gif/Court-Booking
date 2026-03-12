import mongoose from "mongoose";

const getConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`).then(() => {
      console.log("Connected to MongoDB successfully");
    }).catch(() => {
      console.log("Failed to connect to MongoDB");
    })


  }catch (error) {
    console.log("Error while connecting to MongoDB", error.message);
  }}

  export default getConnection;

  //1