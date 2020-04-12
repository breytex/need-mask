import NodeMailer from "nodemailer";

const transporter = NodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface SendMailParams {
  subject: string;
  text: string;
  html: string;
  to: string;
}

export const sendMail = (params: SendMailParams) =>
  transporter.sendMail({
    from: `"Need-Mask.com 😷" <support@need-mask.com>`,
    ...params,
  });
