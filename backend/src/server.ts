import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import voucherRoutes from "./routes/voucherRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";

const app = express();
const PORT = 5000;

// Koneksi ke MongoDB
mongoose
  .connect("mongodb://localhost:27017/voucherdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use express.json() before routes
app.use(cors());
app.use(express.json());

// Rute utama
app.use("/api/vouchers", voucherRoutes);
app.use("/api/subscribe", subscriptionRoutes); // This should work correctly now

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
