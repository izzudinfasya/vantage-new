import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import voucherRoutes from "./routes/voucherRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import passwordRoutes from "./routes/passwordRoutes";
import productRoutes from "./routes/productRoutes";
import { db } from "./config/db.config";

dotenv.config();

const path = require("path");
const app = express();
const PORT = process.env.PORT ? process.env.PORT : "5000";

// Use express.json() before routes
app.use(cors());
app.use(express.json());

// Rute utama
app.get("/", (req, res) => {
  res.json({ message: "Test backend!" });
});
app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend!" });
});
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/vouchers", voucherRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/products", productRoutes);

// Jalankan server
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
