"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const voucherRoutes_1 = __importDefault(require("./routes/voucherRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./routes/subscriptionRoutes"));
const passwordRoutes_1 = __importDefault(require("./routes/passwordRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const db_config_1 = require("./config/db.config");
const midtransClient = require("midtrans-client");
dotenv_1.default.config();
const path = require("path");
const app = (0, express_1.default)();
const PORT = process.env.PORT ? process.env.PORT : "5000";
// Use express.json() before routes
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY;
const RAJAONGKIR_BASE_URL = "https://api.rajaongkir.com/starter";
// Endpoint Raja Ongkir untuk mendapatkan daftar provinsi
app.get("/api/provinces", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.rajaongkir.com/starter/province",
        headers: {
            key: "918df243c692acd099af7d7f4bc19dd4",
        },
    };
    try {
        const response = yield axios_1.default.request(config);
        res.json(response.data.rajaongkir.results);
    }
    catch (error) {
        console.error("Error fetching provinces:", error);
        res.status(400).json({ error: "Failed to fetch provinces" });
    }
}));
// Endpoint Raja Ongkir untuk mendapatkan daftar kota berdasarkan ID provinsi
app.get("/api/cities/:provinceId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.request(config);
        res.json(response.data.rajaongkir.results);
    }
    catch (error) {
        console.error("Error fetching cities:", error);
        res.status(400).json({ error: "Failed to fetch cities" });
    }
}));
// Endpoint Raja Ongkir untuk mendapatkan biaya pengiriman (shipping cost)
app.post("/api/cost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.request(config);
        res.json(response.data.rajaongkir.results);
    }
    catch (error) {
        console.error("Error fetching shipping cost:", error);
        res.status(400).json({ error: "Failed to fetch shipping cost" });
    }
}));
// Rute utama
app.get("/", (req, res) => {
    res.json({ message: "Test backend!" });
});
app.get("/api", (req, res) => {
    res.json({ message: "Hello from backend!" });
});
app.use("/api/uploads", express_1.default.static(path.join(__dirname, "../uploads")));
app.use("/api/vouchers", voucherRoutes_1.default);
app.use("/api/subscribe", subscriptionRoutes_1.default);
app.use("/api/password", passwordRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.post("/api/create-transaction", function (req, res) {
    const { address, city, postal_code, items, deliveryCharge, totalAmount } = req.body;
    let totalAmountInRupiah = totalAmount;
    // Menghapus pengalihan lagi jika sudah di frontend
    if (typeof totalAmountInRupiah === "string") {
        totalAmountInRupiah = Number(totalAmountInRupiah.replace(/[^\d]/g, ""));
    }
    if (!address ||
        !items ||
        items.length === 0 ||
        totalAmountInRupiah === undefined) {
        return res.status(400).json({ error: "Missing required data" });
    }
    let snap;
    if (process.env.NODE_ENV === "production") {
        snap = new midtransClient.Snap({
            isProduction: true,
            serverKey: process.env.MIDTRANS_SERVER_KEY_PRODUCTION,
            clientKey: process.env.MIDTRANS_CLIENT_KEY_PRODUCTION,
        });
    }
    else {
        snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY_SANDBOX,
            clientKey: process.env.MIDTRANS_CLIENT_KEY_SANDBOX,
        });
    }
    const itemTotalAmount = items.reduce((sum, item) => {
        const price = item.price;
        return sum + price * Number(item.qty);
    }, 0);
    let parameter = {
        transaction_details: {
            order_id: "order-id-node-" + Math.round(new Date().getTime() / 1000),
            gross_amount: itemTotalAmount + deliveryCharge,
        },
        item_details: [
            ...items.map((item) => ({
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
        shipping_address: {
            address: address,
            city: city,
            postal_code: postal_code,
            country_code: "ID",
        },
        credit_card: {
            secure: true,
        },
    };
    // Membuat transaksi token
    snap
        .createTransactionToken(parameter)
        .then((transactionToken) => {
        res.json({
            token: transactionToken,
            clientKey: snap.apiConfig.clientKey,
        });
    })
        .catch((error) => {
        res.status(500).json({ error: "Failed to create transaction" });
    });
});
// Jalankan server
db_config_1.db.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
