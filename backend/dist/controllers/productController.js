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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.uploadProduct = void 0;
const Product_1 = require("../models/Product"); // Adjust the import based on your model path
const cloudinary_1 = require("cloudinary");
// Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dt7mzgm7n",
    api_key: process.env.CLOUDINARY_API_KEY || "295888324517958",
    api_secret: process.env.CLOUDINARY_API_SECRET || "BYN7w1S1QtwwU0UItTeJ-FJ7RzA",
});
// Controller for uploading a product
const uploadProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Access product data safely
        const productData = Array.isArray(req.body) ? req.body[0] : req.body;
        // Destructure productData safely
        const { title, badgeType, originalPrice, discountedPrice, details, sizes, qtyTotal, sizeModel, heightModel, washingInstructions, linkProduct, } = productData || {};
        // Validate required fields
        if (!title || !badgeType || !originalPrice || !discountedPrice) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        // Safe JSON parsing with error handling
        const safeParseJSON = (data) => {
            if (!data)
                return [];
            try {
                const parsedData = JSON.parse(data);
                return Array.isArray(parsedData) ? parsedData : [parsedData];
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
        // Ensure files are provided and mapped correctly
        const files = req.files; // Cast req.files to the expected type
        const images = files.images || []; // Get images safely
        const sizeChart = files.sizeChart || []; // Get sizeChart safely
        // Upload images to Cloudinary and get URLs
        const imagePaths = yield Promise.all(images.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const uploadResponse = yield cloudinary_1.v2.uploader.upload(file.path);
                return uploadResponse.secure_url;
            }
            catch (uploadError) {
                console.error("Image upload error:", uploadError);
                throw new Error("Failed to upload image to Cloudinary");
            }
        })));
        // Upload size charts to Cloudinary and get URLs
        const sizechartPaths = yield Promise.all(sizeChart.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const uploadResponse = yield cloudinary_1.v2.uploader.upload(file.path);
                return uploadResponse.secure_url; // Return the URL of the uploaded image
            }
            catch (uploadError) {
                console.error("Image upload error:", uploadError);
                throw new Error("Failed to upload image to Cloudinary");
            }
        })));
        // Create a new product instance with the provided data
        const newProduct = new Product_1.Products({
            title,
            badgeType,
            originalPrice,
            discountedPrice,
            details: parsedDetails,
            sizes: parsedSizes,
            qtyTotal,
            sizeModel,
            heightModel,
            washingInstructions: parsedWashingInstructions,
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
// Controller for getting a single product by ID
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        // Access product data safely
        const productData = Array.isArray(req.body) ? req.body[0] : req.body;
        // If no data is provided, return an error
        if (!productData) {
            return res.status(400).json({ message: "No product data provided." });
        }
        // Destructure fields from the product data
        const { title, badgeType, originalPrice, discountedPrice, details, sizes, qtyTotal, sizeModel, heightModel, washingInstructions, linkProduct, } = productData;
        // Only require fields if it's a new upload (no productId)
        if (!productId) {
            if (!title || !badgeType || !originalPrice || !discountedPrice) {
                return res.status(400).json({ message: "Missing required fields." });
            }
        }
        // Safe JSON parsing with error handling
        const safeParseJSON = (data) => {
            if (!data)
                return [];
            try {
                const parsedData = JSON.parse(data);
                return Array.isArray(parsedData) ? parsedData : [parsedData];
            }
            catch (error) {
                console.error("JSON parsing error:", error);
                return [];
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
        // Ensure files are provided and mapped correctly
        const files = req.files; // Cast req.files to the expected type
        const images = files.images
            ? Array.isArray(files.images)
                ? files.images
                : [files.images]
            : []; // Ensure images is an array
        const sizeChart = files.sizeChart
            ? Array.isArray(files.sizeChart)
                ? files.sizeChart
                : [files.sizeChart]
            : []; // Ensure sizeChart is an array
        // Retrieve the existing product from the database
        const existingProduct = yield Product_1.Products.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        // Combine existing images (URLs) with new images uploaded (if any)
        const imagePaths = [
            ...existingProduct.images, // Existing images from the database
            ...(yield Promise.all(images.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const uploadResponse = yield cloudinary_1.v2.uploader.upload(file.path);
                    return uploadResponse.secure_url;
                }
                catch (uploadError) {
                    console.error("Image upload error:", uploadError);
                    throw new Error("Failed to upload image to Cloudinary");
                }
            })))),
        ];
        // Combine existing size charts (URLs) with new size charts uploaded (if any)
        const sizechartPaths = [
            ...existingProduct.sizeChart, // Existing size charts from the database
            ...(yield Promise.all(sizeChart.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const uploadResponse = yield cloudinary_1.v2.uploader.upload(file.path);
                    return uploadResponse.secure_url;
                }
                catch (uploadError) {
                    console.error("Size chart upload error:", uploadError);
                    throw new Error("Failed to upload size chart to Cloudinary");
                }
            })))),
        ];
        // If there are no new images or size charts, just keep the existing ones
        const finalImagePaths = images.length > 0 ? imagePaths : existingProduct.images;
        const finalSizeChartPaths = sizeChart.length > 0 ? sizechartPaths : existingProduct.sizeChart;
        // Create an object with only fields that need to be updated
        const updateFields = {
            title,
            badgeType,
            originalPrice,
            discountedPrice,
            details: parsedDetails,
            sizes: parsedSizes,
            qtyTotal,
            sizeModel,
            heightModel,
            washingInstructions: parsedWashingInstructions,
            linkProduct,
            images: finalImagePaths, // Combine new images with existing ones
            sizeChart: finalSizeChartPaths, // Combine new size charts with existing ones
        };
        // Filter out undefined fields to avoid overwriting with `undefined`
        Object.keys(updateFields).forEach((key) => {
            if (updateFields[key] === undefined) {
                delete updateFields[key];
            }
        });
        // Update the product in the database
        const updatedProduct = yield Product_1.Products.findByIdAndUpdate(productId, updateFields, { new: true }); // Option to return the updated document
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        return res.status(200).json({
            message: "Product updated successfully!",
            product: updatedProduct,
        });
    }
    catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({
            message: "An error occurred while updating the product.",
            error: error.message,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProduct = yield Product_1.Products.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});
exports.deleteProduct = deleteProduct;
