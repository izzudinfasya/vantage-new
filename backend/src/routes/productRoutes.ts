import { Router } from "express";
import multer from "multer";
import {
  uploadProduct,
  getProducts,
  getProduct,
} from "../controllers/productController";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Save files with unique names
  },
});

const upload = multer({ storage });

// Create a router instance
const router = Router();

// Routes
router.post(
  "/upload",
  upload.fields([
    { name: "images", maxCount: 6 },
    { name: "sizeChart", maxCount: 1 },
  ]),
  uploadProduct
);
router.get("/get-products", getProducts);
router.get("/get-product/:id", getProduct);

export default router;
