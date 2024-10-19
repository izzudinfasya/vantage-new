import express from "express";
import cors from "cors";
import connectDB from "./db"; // Import koneksi MongoDB
import voucherRoutes from "./routes/voucherRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import dotenv from "dotenv";

dotenv.config();

// Inisialisasi Express
const app = express();

// Gunakan CORS dan JSON
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
connectDB();

// Routes utama
app.use("/api/vouchers", voucherRoutes);
app.use("/api/subscribe", subscriptionRoutes);

export default app;
