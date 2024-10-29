import { Request, Response } from "express";
import multer from "multer"; // Import multer for handling file uploads
import { Products } from "../models/Product"; // Adjust the import based on your model path

// Initialize multer for file storage
const upload = multer({ dest: "uploads/" }); // Specify your upload directory

// Controller for uploading a product
export const uploadProduct = async (req: Request, res: Response) => {
  try {
    // Log the entire body to understand its structure
    console.log("Incoming request body:", req.body);

    // Check if req.body is an array and access the first element if it is
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
        // Ensure parsed data is an array
        if (Array.isArray(parsedData)) {
          return parsedData;
        } else if (typeof parsedData === "string") {
          // If it's a string, wrap it in an array
          return [parsedData];
        } else {
          return []; // Return empty array for any other type
        }
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

    const imagePaths = Array.isArray(images)
      ? images.map((file) => file.path)
      : [];
    const sizechartPaths = Array.isArray(sizeChart)
      ? sizeChart.map((file) => file.path)
      : [];

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
