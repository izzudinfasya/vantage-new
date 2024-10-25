import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import voucherRoutes from "./routes/voucherRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import passwordRoutes from "./routes/passwordRoutes";
import { db } from "./config/db.config";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? process.env.PORT : "5000";

// Use express.json() before routes
app.use(cors());
app.use(express.json());

// Rute utama
app.use("/api/vouchers", voucherRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/password", passwordRoutes);

// Jalankan server
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
