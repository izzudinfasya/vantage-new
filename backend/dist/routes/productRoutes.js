"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const productController_1 = require("../controllers/productController");
// Multer configuration
const storage = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Save files with unique names
    },
});
const upload = (0, multer_1.default)({ storage });
// Create a router instance
const router = (0, express_1.Router)();
// Routes
router.post("/upload", upload.fields([
    { name: "images", maxCount: 6 },
    { name: "sizeChart", maxCount: 1 },
]), productController_1.uploadProduct);
router.get("/get-products", productController_1.getProducts);
router.get("/get-product/:id", productController_1.getProduct);
exports.default = router;
