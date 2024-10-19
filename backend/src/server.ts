import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import voucherRoutes from "./routes/voucherRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err: any) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

connectDB();

// Use express.json() before routes
app.use(cors());
app.use(express.json());

// Rute utama
app.use("/api/vouchers", voucherRoutes);
app.use("/api/subscribe", subscriptionRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
