import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Gunakan koneksi yang ada
  }

  try {
    await mongoose
      .connect(process.env.MONGO_URI!)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("MongoDB connection error:", err));
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Hentikan jika tidak bisa terhubung
  }
};

export default connectDB;
