import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

export const sendEmail = async (options: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_HOST,
    port: Number(process.env.NEXT_PUBLIC_PORT),
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_PASSWORD,
    },
    secure: true
  });

  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};
