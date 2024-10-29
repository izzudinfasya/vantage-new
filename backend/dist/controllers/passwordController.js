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
exports.validatePassword = exports.getPassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_validator_1 = require("express-validator");
const Password_1 = __importDefault(require("../models/Password"));
const setPassword = "FIRSTDROP";
// Fungsi untuk mengirim password melalui email
const sendPasswordEmail = (email, name, password) => __awaiter(void 0, void 0, void 0, function* () {
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
        subject: "Your Exclusive Early Access Password",
        html: `
      <div style="font-family: Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <header style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #1a1a1a; font-size: 28px;">You’re In!</h1>
          <p style="font-size: 18px; color: #666;">Exclusive Access Just for You</p>
        </header>
        <p style="font-size: 16px; color: #000000">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #000000">
          We're excited to have you as part of the select few who get to experience our latest collection before anyone else.
        </p>
        <p style="font-size: 16px; color: #000000">
          Your exclusive early access password is: <span style="font-weight: bold; color: #1a73e8;">${password}</span>
        </p>
        <p style="font-size: 16px; color: #000000">
          Use this password to unlock early access to our latest drops and shop the newest arrivals before the public.
        </p>
        <p style="font-size: 16px; color: #000000">
          If you have any questions, we're just an email away. We can't wait to see what you'll choose!
        </p>
        <p style="font-size: 16px; color: #000000">Cheers,<br><strong>The VANTAGE Team</strong></p>
        <footer style="text-align: center; padding-top: 20px; padding-bottom: 20px; border-top: 1px solid #e0e0e0; margin-top: 20px; background-color: #1a1a1a; color: #ffffff;">
          <p style="font-size: 12px; color: #ffffff;">
            © 2024 VANTAGE. All rights reserved.<br>
            <a href="https://www.vantageofficial.vercel.app/home" style="color: #ffffff; text-decoration: underline;">Visit our website</a> | 
            <a href="https://www.instagram.com/vantageofficial" style="color: #ffffff; text-decoration: underline;">Follow us on Instagram</a>
          </p>
        </footer>
      </div>
    `,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
        return true;
    }
    catch (error) {
        console.error("Error while sending email:", error); // Show the message
        console.error("Full error details:", error); // Show full details
        return false;
    }
});
// Fungsi untuk mendaftar pengguna dan mengirim password
const getPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: "Please complete all required fields.",
            errors: errors.array(),
        });
    }
    const { email, name } = req.body;
    try {
        // Mengecek apakah pengguna sudah terdaftar
        const existingUser = yield Password_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                message: "Someone already exists with this email address.",
            });
        }
        // Debug: Log email sending process
        console.log("Sending email to:", email, "with password:", setPassword);
        // Mengirim email dengan password akses terlebih dahulu
        const emailSent = yield sendPasswordEmail(email, name, setPassword);
        if (!emailSent) {
            return res.status(500).send({
                message: "Failed to send email. Please try again later.",
            });
        }
        // Menyimpan pengguna ke database hanya jika email berhasil dikirim
        const newUser = new Password_1.default({
            email,
            name,
            password: setPassword, // Simpan password yang sudah dihasilkan
        });
        yield newUser.save();
        res.status(201).send({
            message: "You have successfully signed up for early access! Check your email for the access password.",
        });
    }
    catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send({
            message: err.message ||
                "An unexpected error occurred while processing your request. Please try again later.",
        });
    }
});
exports.getPassword = getPassword;
const validatePassword = (req, res) => {
    const { password } = req.body;
    if (password === setPassword) {
        return res.status(200).send({ message: "Password is correct." });
    }
    else {
        return res.status(401).send({ message: "Incorrect password." });
    }
};
exports.validatePassword = validatePassword;
