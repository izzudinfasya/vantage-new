import { Router } from "express";
import {
  deleteWaitingList,
  getPassword,
  validatePassword,
  waitingList,
} from "../controllers/passwordController";
import { body } from "express-validator";

const router = Router();

router.post(
  "/get-password",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("name").not().isEmpty().withMessage("Name is required"),
  ],
  getPassword
);

router.post("/validate", validatePassword);
router.get("/get-waiting-list", waitingList);
router.delete("/:id", deleteWaitingList);

export default router;
