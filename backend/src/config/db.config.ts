import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// mongodb://localhost:27017/vantage
const MONGODB_URL: string = process.env.MONGODB_URL || "";

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export const db = mongoose
  .connect(MONGODB_URL, options)
  .then((res) => {
    if (res) {
      console.log("Database Connection Successfull");
    }
  })
  .catch((err) => console.log(err));
