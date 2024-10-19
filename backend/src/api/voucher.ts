import nodemailer from "nodemailer";
import { Voucher } from "../models/Voucher";
import { validationResult } from "express-validator";
import { VercelRequest, VercelResponse } from "@vercel/node";

// Fungsi untuk mengirim kode voucher melalui email
const sendVoucherEmail = async (email: string, voucherCode: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER as string, // Pastikan gunakan environment variable
      pass: process.env.GMAIL_PASS as string,
    },
  });

  const mailOptions = {
    from: "VANTAGE Official",
    to: email,
    subject: "Your Voucher Code",
    text: `Thank you for signing up! Here is your voucher code: ${voucherCode}`,
  };

  await transporter.sendMail(mailOptions);
};

// Fungsi utama handler untuk serverless function di Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Please complete all required fields." });
  }

  const { email, name } = req.body;

  try {
    // Cek apakah email sudah ada di database
    const existingVoucher = await Voucher.findOne({ email });

    if (existingVoucher) {
      return res.status(400).json({
        message: "This email is already registered. Please use another email.",
      });
    }

    const voucherCode: string = "DISCOUNT10";

    // Simpan email dan kode voucher ke database
    const voucher = new Voucher({
      email,
      name,
      code: voucherCode,
      used: false,
    });

    await voucher.save();

    // Kirimkan email voucher
    await sendVoucherEmail(email, voucherCode);

    res.status(200).json({
      message: "The voucher code has been successfully sent to your email!",
    });
  } catch (err) {
    console.error("Error saving voucher:", err);
    res.status(500).json({
      message:
        "An error occurred while saving the voucher. Please try again later.",
    });
  }
}
