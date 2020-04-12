import { getPublishedMail } from "../../../mails/published";
import { WebhookRequest } from "../../../types/webhooks";
import { NextApiResponse } from "next";
import { Supplier } from "../../../types/Supplier";
import { authWebhook } from "../../../api-helpers/authWebhook";
import { sendMail, SendMailParams } from "../../../api-helpers/mailer";

const handler = async (req: WebhookRequest<Supplier>, res: NextApiResponse) => {
  const { data } = req.body.event;
  if (data.old.status !== "pending" || data.new.status !== "published") {
    res.end(
      "Row's published was not switched from false to true; this is a no-op."
    );
    return;
  }

  const mailTextParams = getPublishedMail(data.new.id, data.new.email);
  const mailParams: SendMailParams = {
    to: data.new.email,
    ...mailTextParams,
  };

  sendMail(mailParams);

  res.end("success");
  return;
};

export default authWebhook(handler);
