const nodemailer = require("nodemailer");

const config = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_IS_SECURED !== "false", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
const transporter = nodemailer.createTransport(config);

export interface SendMailParams {
  subject: string;
  text: string;
  html: string;
  to: string;
}

export const sendMail = ({ subject, text, html, to }: SendMailParams) =>
  transporter.sendMail({
    from: '"Need-Mask.com 😷" <support@need-mask.com>',
    to,
    subject,
    text,
    html,
  });
