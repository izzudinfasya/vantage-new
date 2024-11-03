import { Router } from "express";
import multer from "multer";
import {
  uploadProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

// Multer configuration
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Save files with unique names
  },
});

const upload = multer({ storage });

// Create a router instance
const router = Router();

// Define types for req.files
interface UploadedFiles {
  images?: Express.Multer.File[];
  sizeChart?: Express.Multer.File[];
}

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
router.put(
  "/update/:id",
  upload.fields([
    { name: "images", maxCount: 6 },
    { name: "sizeChart", maxCount: 1 },
  ]),
  updateProduct
);
router.delete("/:id", deleteProduct);

export default router;
