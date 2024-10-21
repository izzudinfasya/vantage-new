import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getVoucher } from "../controllers/voucherController";

const router: Router = Router();

// Middleware to validate email and name input
const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route to handle voucher requests
router.post(
  "/get-voucher",
  [
    body("email").isEmail().withMessage("Email tidak valid."),
    body("name").notEmpty().withMessage("Name is required."),
  ],
  validationMiddleware,
  getVoucher
);

export default router;
