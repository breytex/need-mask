import { getLoginRequestMail } from "./../../../mails/loginRequest";
import { NextApiResponse, NextApiRequest } from "next";
import { Supplier } from "../../../types/Supplier";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { randomBytes } from "crypto";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = req.body.event;
  if (!req.body.email) {
    res.statusCode = 403;
    res.end("Email missing in request");
    return;
  }
  let code = Math.floor(Math.random() * 1e6);
  if (code < 1000000) {
    code = code + 100000;
  }
  // const code = "123456";

  const mailTextParams = getLoginRequestMail("" + code);
  const mailParams: SendMailParams = {
    to: data.new.email,
    ...mailTextParams,
  };

  sendMail(mailParams);

  res.end("success");
  return;
};
