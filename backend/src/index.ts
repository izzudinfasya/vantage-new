import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import session from "express-session";
import voucherRoutes from "./routes/voucherRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import passwordRoutes from "./routes/passwordRoutes";
import productRoutes from "./routes/productRoutes";
import { db } from "./config/db.config";

const midtransClient = require("midtrans-client");

dotenv.config();

const path = require("path");
const app = express();
const PORT = process.env.PORT ? process.env.PORT : "5000";

// Use express.json() before routes
app.use(cors());
app.use(express.json());

// Endpoint Raja Ongkir untuk mendapatkan daftar provinsi
app.get("/api/provinces", async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.rajaongkir.com/starter/province",
    headers: {
      key: "918df243c692acd099af7d7f4bc19dd4",
    },
  };

  try {
    const response = await axios.request(config);
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    res.status(400).json({ error: "Failed to fetch provinces" });
  }
});

// Endpoint Raja Ongkir untuk mendapatkan daftar kota berdasarkan ID provinsi
app.get("/api/cities/:provinceId", async (req, res) => {
  const { provinceId } = req.params;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.rajaongkir.com/starter/city?province=${provinceId}`,
    headers: {
      key: "918df243c692acd099af7d7f4bc19dd4", // API Key Anda
    },
  };

  try {
    const response = await axios.request(config);
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(400).json({ error: "Failed to fetch cities" });
  }
});

// Endpoint Raja Ongkir untuk mendapatkan biaya pengiriman (shipping cost)
app.post("/api/cost", async (req, res) => {
  const { origin, destination, weight, courier } = req.body;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.rajaongkir.com/starter/cost",
    headers: {
      key: "918df243c692acd099af7d7f4bc19dd4",
    },
    data: {
      origin: origin,
      destination: destination,
      weight: weight,
      courier: courier,
    },
  };

  try {
    const response = await axios.request(config);
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    console.error("Error fetching shipping cost:", error);
    res.status(400).json({ error: "Failed to fetch shipping cost" });
  }
});

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

app.post("/api/create-transaction", function (req, res) {
  const { name, phone, address, items, deliveryCharge, totalAmount } = req.body;

  let totalAmountInRupiah = totalAmount;

  // Menghapus pengalihan lagi jika sudah di frontend
  if (typeof totalAmountInRupiah === "string") {
    totalAmountInRupiah = Number(totalAmountInRupiah.replace(/[^\d]/g, ""));
  }

  if (
    !address ||
    !items ||
    items.length === 0 ||
    totalAmountInRupiah === undefined
  ) {
    return res.status(400).json({ error: "Missing required data" });
  }

  let snap;
  if (process.env.NODE_ENV === "production") {
    snap = new midtransClient.Snap({
      isProduction: true,
      serverKey: process.env.MIDTRANS_SERVER_KEY_PRODUCTION,
      clientKey: process.env.MIDTRANS_CLIENT_KEY_PRODUCTION,
    });
  } else {
    snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY_SANDBOX,
      clientKey: process.env.MIDTRANS_CLIENT_KEY_SANDBOX,
    });
  }

  const itemTotalAmount = items.reduce((sum: any, item: any) => {
    const price = item.price;
    return sum + price * Number(item.qty);
  }, 0);

  let parameter = {
    transaction_details: {
      order_id: "order-id-node-" + Math.round(new Date().getTime() / 1000),
      gross_amount: itemTotalAmount + deliveryCharge,
    },
    item_details: [
      ...items.map((item: any) => ({
        id: item.id,
        price: item.price,
        quantity: Number(item.qty),
        name: item.title,
      })),
      {
        id: "Fee Shipping",
        price: deliveryCharge,
        quantity: 1,
        name: "Fee Shipping",
      },
    ],
    customer_details: {
      first_name: name,
      phone: phone,
      address: address,
      shipping_address: {
        first_name: name,
        address: address,
        phone: phone,
        country_code: "IDN",
      },
    },
    credit_card: {
      secure: true,
    },
  };

  // Membuat transaksi token
  snap
    .createTransactionToken(parameter)
    .then((transactionToken: any) => {
      res.json({
        token: transactionToken,
        clientKey: snap.apiConfig.clientKey,
      });
    })
    .catch((error: any) => {
      res.status(500).json({ error: "Failed to create transaction" });
    });
});

// Jalankan server
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
