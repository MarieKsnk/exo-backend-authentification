import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to the DB");
  } catch (err) {
    console.error("Error", err.message);
  }
};

export default connectDB;
