"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoucher = void 0;
const Voucher_1 = require("../models/Voucher");
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_validator_1 = require("express-validator");
// Fungsi untuk mengirim kode voucher melalui email
const sendVoucherEmail = (email, name, voucherCode) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: '"VANTAGE Official" <vantageofficial.id@gmail.com>',
        to: email,
        subject: "Welcome to VANTAGE! Enjoy Your Exclusive Discount!",
        html: `
    <div style="font-family: Helvetica; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <header style="text-align: center; margin-bottom: 20px;">
        <img src="cid:logo" alt="VANTAGE Logo" style="max-width: 100px;">
        <h1 style="color: #1a1a1a;">Welcome to VANTAGE!</h1>
      </header>
      <p style="font-size: 16px; color: #000000">Hi <strong>${name}</strong>,</p>
      <p style="font-size: 16px; color: #000000">
        Thank you for subscribing to <strong>VANTAGE</strong>! We're thrilled to have you as part of our community.
      </p>
      <p style="font-size: 16px; color: #000000">
        As a token of our appreciation, we're excited to offer you <strong>10% off</strong> your first purchase! 
        Use the code <span style="font-weight: bold;">${voucherCode}</span> at checkout to enjoy your discount.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://vantageofficial.vercel.app/home" style="display: inline-block; padding: 10px 20px; background-color: #000000; color: white; text-decoration: none; border-radius: 5px;">Start Shopping</a>
      </div>
      <p style="font-size: 16px; color: #000000">
        By subscribing, you'll also be the first to receive the latest news on trends, exclusive promotions, and much more.
      </p>
      <p style="font-size: 16px; color: #000000">Stay tuned for updates that will keep you ahead in style!</p>
      <p style="font-size: 16px; color: #000000">
        If you have any questions or need assistance, feel free to reach out. We’re here to help!
      </p>
      <p style="font-size: 16px; color: #000000">Happy shopping!</p>
      <p style="font-size: 16px; color: #000000;">Best regards,<br><strong>The VANTAGE Team</strong></p>
     <footer style="text-align: center; padding-top: 20px; padding-bottom: 20px; border-top: 1px solid #e0e0e0; margin-top: 20px; background-color: #000000; color: white; padding-bottom: 20px;">
     <div style="margin-top: 20px;">
         <h3 style="font-size: 16px; color: #ffffff;">Find Us</h3>
         <div style="display: inline-block;">
         <a href="https://instagram.com/vantageofficial.id" target="_blank" rel="noopener noreferrer" style="text-decoration: none !important; color: inherit;">
             <img src="cid:instagram" alt="Instagram" style="color: white; width: 24px; margin: 0 8px;">
         </a>
         <a href="https://tiktok.com/vantageofficial.id" target="_blank" rel="noopener noreferrer" style="text-decoration: none !important; color: inherit;">
             <img src="cid:tiktok" alt="TikTok" style="color: white; width: 24px; margin: 0 8px;">
         </a>
         <a href="https://shopee.com/vantage_id" target="_blank" rel="noopener noreferrer" style="text-decoration: none !important; color: inherit;">
             <img src="cid:shop" alt="Shopee" style="color: white; width: 24px; margin: 0 8px;">
         </a>
         </div>
     </div>

    <p style="font-size: 12px; color: #ffffff;">
        © 2024 VANTAGE, All rights reserved.<br>
    </p>
    <a href="#" style="color: #ffffff; text-decoration: underline;">Unsubscribe</a> | 
    <a href="https://shopee.com/vantage_id" style="color: #ffffff; text-decoration: underline;">Visit our store</a>
     </footer>
    </div>
  `,
        attachments: [
            {
                filename: "logo.png",
                path: "../frontend/src/assets/logo-email.png",
                cid: "logo",
            },
            {
                filename: "instagram.png",
                path: "../frontend/src/assets/instagram.png",
                cid: "instagram",
            },
            {
                filename: "tiktok.png",
                path: "../frontend/src/assets/tiktok.png",
                cid: "tiktok",
            },
            {
                filename: "shop.png",
                path: "../frontend/src/assets/shopee.png",
                cid: "shop",
            },
        ],
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email. Please try again later.");
    }
});
// Fungsi untuk menyimpan email dan mengirimkan voucher
const getVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: "Please complete all required fields.",
            errors: errors.array(),
        });
    }
    const { email, name, consent } = req.body;
    if (!consent) {
        return res.status(400).send({
            message: "You must agree to receive emails before subscribing.",
        });
    }
    try {
        const existingVoucher = yield Voucher_1.Voucher.findOne({ email });
        if (existingVoucher) {
            return res.status(400).send({
                message: "This email is already registered. Please use another email.",
            });
        }
        const voucherCode = "DISCOUNT10";
        yield sendVoucherEmail(email, name, voucherCode);
        const voucher = new Voucher_1.Voucher({
            email,
            name,
            consent,
            code: voucherCode,
            used: false,
        });
        yield voucher.save();
        res.status(200).send({
            message: "Subscription successful! The voucher code has been successfully sent to your email!",
        });
    }
    catch (err) {
        console.error("Error during voucher process:", err);
        res.status(500).send({
            message: err.message ||
                "An unexpected error occurred while processing your request. Please try again later.",
        });
    }
});
exports.getVoucher = getVoucher;
