"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
// mongodb://localhost:27017/vantage
const MONGODB_URL = process.env.MONGODB_URL || "";
const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};
exports.db = mongoose_1.default
    .connect(MONGODB_URL, options)
    .then((res) => {
    if (res) {
        console.log("Database Connection Successfull");
    }
})
    .catch((err) => console.log(err));
