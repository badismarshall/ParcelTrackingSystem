import nodemailer from "nodemailer";

// We are using a free SMTP server of gmail for development purposes.
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'bgamer1612@gmail.com',
      pass: process.env.SMTP_AUTH_PASS,
    },
  });

