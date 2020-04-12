import { WebhookRequest } from "../../../types/webhooks";
import { NextApiResponse } from "next";
import { Request } from "../../../types/Request";
import { authWebhook } from "../utils/authWebhook";
import { sendMail, SendMailParams } from "../utils/sendMail";

const handler = async (req: WebhookRequest<Request>, res: NextApiResponse) => {
  const { data } = req.body.event;

  const mailParams: SendMailParams = {
    to: data.new.email,
    subject: "Supplier information request",
    text: "some text",
    html: "some html",
  };

  sendMail(mailParams);

  res.end("success");
  return;
};

export default authWebhook(handler);
