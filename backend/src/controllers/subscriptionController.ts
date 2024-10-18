import { Request, Response } from "express";
import { Subscription } from "../models/Subscription";

export const createSubscription = async (req: Request, res: Response) => {
  const { email, name, consent } = req.body;

  if (!consent) {
    return res
      .status(400)
      .send({ message: "You must agree to receive emails." });
  }

  try {
    const newSubscription = new Subscription({ email, name, consent });
    await newSubscription.save();
    return res.status(201).send({ message: "Subscription successful!" });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(409)
        .send({ message: "This email is already registered." });
    }
    console.error("Error saving subscription:", error);
    return res
      .status(500)
      .send({ message: "An error occurred. Please try again." });
  }
};
