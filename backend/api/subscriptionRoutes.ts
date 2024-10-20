import { Router } from "express";
import { createSubscription } from "../src/controllers/subscriptionController";

const router = Router();

router.post("/", createSubscription);

export default router;
