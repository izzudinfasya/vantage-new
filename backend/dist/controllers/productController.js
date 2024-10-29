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
exports.getProduct = exports.getProducts = exports.uploadProduct = void 0;
const multer_1 = __importDefault(require("multer")); // Import multer for handling file uploads
const Product_1 = require("../models/Product"); // Adjust the import based on your model path
// Initialize multer for file storage
const upload = (0, multer_1.default)({ dest: "uploads/" }); // Specify your upload directory
// Controller for uploading a product
const uploadProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Log the entire body to understand its structure
        console.log("Incoming request body:", req.body);
        // Check if req.body is an array and access the first element if it is
        const productData = Array.isArray(req.body) ? req.body[0] : req.body;
        // Log the product data to ensure it is defined
        console.log("Product data to be processed:", productData);
        // Destructure productData safely
        const { title, badgeType, originalPrice, discountedPrice, details, sizes, sizeModel, heightModel, washingInstructions, returnPolicies, shippingPolicies, linkProduct, } = productData || {}; // Default to empty object to avoid destructuring errors
        // Validate required fields
        if (!title || !badgeType || !originalPrice || !discountedPrice) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        // Log incoming product data for debugging
        console.log("Incoming product data:", productData);
        // Safe JSON parsing with error handling
        const safeParseJSON = (data) => {
            if (!data)
                return [];
            try {
                const parsedData = JSON.parse(data);
                // Ensure parsed data is an array
                if (Array.isArray(parsedData)) {
                    return parsedData;
                }
                else if (typeof parsedData === "string") {
                    // If it's a string, wrap it in an array
                    return [parsedData];
                }
                else {
                    return []; // Return empty array for any other type
                }
            }
            catch (error) {
                console.error("JSON parsing error:", error);
                return []; // Return empty array on error
            }
        };
        // Parse JSON fields
        const parsedDetails = Array.isArray(details)
            ? details
            : safeParseJSON(details);
        const parsedSizes = Array.isArray(sizes) ? sizes : safeParseJSON(sizes);
        const parsedWashingInstructions = Array.isArray(washingInstructions)
            ? washingInstructions
            : safeParseJSON(washingInstructions);
        const parsedReturnPolicies = Array.isArray(returnPolicies)
            ? returnPolicies
            : safeParseJSON(returnPolicies);
        const parsedShippingPolicies = Array.isArray(shippingPolicies)
            ? shippingPolicies
            : safeParseJSON(shippingPolicies);
        // Ensure files are provided and mapped correctly
        const files = req.files; // Cast req.files to the expected type
        const images = files.images || []; // Get images safely
        const sizeChart = files.sizeChart || []; // Get sizeChart safely
        const imagePaths = Array.isArray(images)
            ? images.map((file) => file.path)
            : [];
        const sizechartPaths = Array.isArray(sizeChart)
            ? sizeChart.map((file) => file.path)
            : [];
        // Create a new product instance with the provided data
        const newProduct = new Product_1.Products({
            title,
            badgeType,
            originalPrice,
            discountedPrice,
            details: parsedDetails,
            sizes: parsedSizes,
            sizeModel,
            heightModel,
            washingInstructions: parsedWashingInstructions,
            returnPolicies: parsedReturnPolicies,
            shippingPolicies: parsedShippingPolicies,
            linkProduct,
            images: imagePaths,
            sizeChart: sizechartPaths,
        });
        // Save the product to the database and catch any save errors
        yield newProduct.save();
        return res.status(201).json({
            message: "Product uploaded successfully!",
            product: newProduct,
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({
            message: "An error occurred while uploading the product.",
            error: error.message,
        });
    }
});
exports.uploadProduct = uploadProduct;
// Controller for getting all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Products.find();
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch products", error: error.message });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield Product_1.Products.findById(id); // Find the product by ID
        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(product); // Respond with the found product
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch product", error: error.message });
    }
});
exports.getProduct = getProduct;
