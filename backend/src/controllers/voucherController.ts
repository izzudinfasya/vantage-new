import { Request, Response } from "express";
import { Voucher } from "../models/Voucher";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";

// Fungsi untuk mengirim kode voucher melalui email
const sendVoucherEmail = async (email: string, voucherCode: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log("GMAIL_USER:", process.env.GMAIL_USER);
  console.log("GMAIL_PASS:", process.env.GMAIL_PASS);

  const mailOptions = {
    from: "VANTAGE Official",
    to: email,
    subject: "Your Voucher Code",
    text: `Thank you for signing up! Here is your voucher code: ${voucherCode}`,
  };

  await transporter.sendMail(mailOptions);
};

// Fungsi untuk menyimpan email dan mengirimkan voucher
export const getVoucher = async (req: Request, res: Response) => {
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
      return res
        .status(400)
        .send("This email is already registered. Please use another email.");
    }

    const voucherCode = "DISCOUNT10";
    //   "VOUCHER" + Math.random().toString(36).substring(7).toUpperCase();

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
};
