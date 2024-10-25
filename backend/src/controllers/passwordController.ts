import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import PasswordModel from "../models/Password";

const setPassword = "FIRSTDROP";

// Fungsi untuk mengirim password melalui email
const sendPasswordEmail = async (
  email: string,
  name: string,
  password: string
) => {
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

  const mailOptions = {
    from: '"VANTAGE Official" <vantageofficial.id@gmail.com>',
    to: email,
    subject: "Your Exclusive Early Access Password",
    html: `
      <div style="font-family: Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <header style="text-align: center; margin-bottom: 20px;">
          <img src="cid:logo" alt="VANTAGE Logo" style="max-width: 100px;">
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
    attachments: [
      {
        filename: "logo.png",
        path: "../frontend/src/assets/logo-email.png",
        cid: "logo",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};

// Fungsi untuk mendaftar pengguna dan mengirim password
export const getPassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: "Please complete all required fields.",
      errors: errors.array(),
    });
  }

  const { email, name } = req.body;

  try {
    // Mengecek apakah pengguna sudah terdaftar
    const existingUser = await PasswordModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        message: "Someone already exists with this email address.",
      });
    }

    // Menyimpan pengguna ke database
    const newUser = new PasswordModel({
      email,
      name,
      password: setPassword,
    });
    await newUser.save();

    // Mengirim email dengan password akses
    await sendPasswordEmail(email, name, setPassword);

    res.status(201).send({
      message:
        "You have successfully signed up for early access! Check your email for the access password.",
    });
  } catch (err: any) {
    console.error("Error during registration:", err);

    res.status(500).send({
      message:
        err.message ||
        "An unexpected error occurred while processing your request. Please try again later.",
    });
  }
};

export const validatePassword = (req: Request, res: Response) => {
  const { password } = req.body;

  if (password === setPassword) {
    return res.status(200).send({ message: "Password is correct." });
  } else {
    return res.status(401).send({ message: "Incorrect password." });
  }
};
