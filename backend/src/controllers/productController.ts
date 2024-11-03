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
    // Access product data safely
    const productData = Array.isArray(req.body) ? req.body[0] : req.body;

    // Destructure productData safely
    const {
      title,
      badgeType,
      originalPrice,
      discountedPrice,
      details,
      sizes,
      qtyTotal,
      sizeModel,
      heightModel,
      washingInstructions,
      linkProduct,
    } = productData || {};

    // Validate required fields
    if (!title || !badgeType || !originalPrice || !discountedPrice) {
      return res.status(400).json({ message: "Missing required fields." });
    }

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
      qtyTotal,
      sizeModel,
      heightModel,
      washingInstructions: parsedWashingInstructions,
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    // Access product data safely
    const productData = Array.isArray(req.body) ? req.body[0] : req.body;

    // If no data is provided, return an error
    if (!productData) {
      return res.status(400).json({ message: "No product data provided." });
    }

    // Destructure fields from the product data
    const {
      title,
      badgeType,
      originalPrice,
      discountedPrice,
      details,
      sizes,
      qtyTotal,
      sizeModel,
      heightModel,
      washingInstructions,
      linkProduct,
    } = productData;

    // Only require fields if it's a new upload (no productId)
    if (!productId) {
      if (!title || !badgeType || !originalPrice || !discountedPrice) {
        return res.status(400).json({ message: "Missing required fields." });
      }
    }

    // Safe JSON parsing with error handling
    const safeParseJSON = (data: string | undefined): any[] => {
      if (!data) return [];
      try {
        const parsedData = JSON.parse(data);
        return Array.isArray(parsedData) ? parsedData : [parsedData];
      } catch (error) {
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
    // Create an object with only fields that need to be updated
    const updateFields: any = {
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
    };

    // Handle file uploads
    if (req.files) {
      const images = (req.files as Express.Multer.File[]).map(
        (file) => file.path
      );
      updateFields.images = images;
    }

    // Filter out undefined fields to avoid overwriting with `undefined`
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Update the product in the database
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true } // Option to return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: "An error occurred while updating the product.",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
