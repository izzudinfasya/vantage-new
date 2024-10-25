import { Router } from "express";
import {
  getPassword,
  validatePassword,
} from "../controllers/passwordController";
import { body } from "express-validator";

const router = Router();

router.post(
  "/get-password",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("name").not().isEmpty().withMessage("Name is required"),
    body("phoneNumber").not().isEmpty().withMessage("Phone number is required"),
  ],
  getPassword
);

router.post("/validate", validatePassword);

export default router;
