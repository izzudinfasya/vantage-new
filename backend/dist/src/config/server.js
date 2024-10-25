"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const voucherRoutes_1 = __importDefault(require("../../api/voucherRoutes"));
const subscriptionRoutes_1 = __importDefault(require("../../api/subscriptionRoutes"));
const db_config_1 = require("./db.config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? process.env.PORT : "5000";
// Use express.json() before routes
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rute utama
app.use("/api/vouchers", voucherRoutes_1.default);
app.use("/api/subscribe", subscriptionRoutes_1.default);
// Jalankan server
db_config_1.db.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});