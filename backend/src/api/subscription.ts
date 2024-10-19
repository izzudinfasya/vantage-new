import { VercelRequest, VercelResponse } from "@vercel/node";
import { Subscription } from "../models/Subscription";

export default async function createSubscription(
  req: VercelRequest,
  res: VercelResponse
) {
  // Memastikan hanya menerima metode POST
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Method Not Allowed" });
  }

  const { email, name, consent } = req.body;

  // Validasi consent
  if (!consent) {
    return res
      .status(400)
      .send({ message: "You must agree to receive emails." });
  }

  try {
    // Membuat objek subscription baru
    const newSubscription = new Subscription({ email, name, consent });
    await newSubscription.save();
    return res.status(201).send({ message: "Subscription successful!" });
  } catch (error: any) {
    // Menangani error duplikasi email
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
}
