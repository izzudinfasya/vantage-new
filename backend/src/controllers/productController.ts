import { Request, Response } from "express";
import { Products } from "../models/Product"; // Adjust the import based on your model path
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dt7mzgm7n",
  api_key: process.env.CLOUDINARY_API_KEY || "295888324517958",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "BYN7w1S1QtwwU0UItTeJ-FJ7RzA",
});

// Controller for uploading a product
export const uploadProduct = async (req: Request, res: Response) => {
  try {
    // Log incoming request body
    console.log("Incoming request body:", req.body);

    // Access product data safely
    const productData = Array.isArray(req.body) ? req.body[0] : req.body;

    // Log the product data to ensure it is defined
    console.log("Product data to be processed:", productData);

    // Destructure productData safely
    const {
      title,
      badgeType,
      originalPrice,
      discountedPrice,
      details,
      sizes,
      sizeModel,
      heightModel,
      washingInstructions,
      returnPolicies,
      shippingPolicies,
      linkProduct,
    } = productData || {}; // Default to empty object to avoid destructuring errors

    // Validate required fields
    if (!title || !badgeType || !originalPrice || !discountedPrice) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Log incoming product data for debugging
    console.log("Incoming product data:", productData);

    // Safe JSON parsing with error handling
    const safeParseJSON = (data: string | undefined): any[] => {
      if (!data) return [];
      try {
        const parsedData = JSON.parse(data);
        return Array.isArray(parsedData) ? parsedData : [parsedData];
      } catch (error) {
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
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }; // Cast req.files to the expected type
    const images = files.images || []; // Get images safely
    const sizeChart = files.sizeChart || []; // Get sizeChart safely

    // Upload images to Cloudinary and get URLs
    const imagePaths = await Promise.all(
      images.map(async (file) => {
        try {
          const uploadResponse = await cloudinary.uploader.upload(file.path);
          return uploadResponse.secure_url;
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          throw new Error("Failed to upload image to Cloudinary");
        }
      })
    );

    // Upload size charts to Cloudinary and get URLs
    const sizechartPaths = await Promise.all(
      sizeChart.map(async (file) => {
        try {
          const uploadResponse = await cloudinary.uploader.upload(file.path);
          return uploadResponse.secure_url; // Return the URL of the uploaded image
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          throw new Error("Failed to upload image to Cloudinary");
        }
      })
    );

    // Create a new product instance with the provided data
    const newProduct = new Products({
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
    await newProduct.save();

    return res.status(201).json({
      message: "Product uploaded successfully!",
      product: newProduct,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: "An error occurred while uploading the product.",
      error: error.message,
    });
  }
};

// Controller for getting all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// Controller for getting a single product by ID
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Products.findById(id); // Find the product by ID

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product); // Respond with the found product
  } catch (error: any) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};
