import { getPublishedMail } from "../../../mails/published";
import { Supplier } from "../../../types/Supplier";
import { createWebhookHandler } from "../utils/createWebhooookHandler";
import { sendMail, SendMailParams } from "../utils/sendMail";

export default createWebhookHandler<Supplier>(async (req, res) => {
  const { data } = req.body.event;
  if (data.old.status !== "pending" || data.new.status !== "published") {
    return res.end(
      "Row's published was not switched from pending to published; this is a no-op."
    );
  }

  const mailTextParams = getPublishedMail(data.new.id, data.new.email);
  const mailParams: SendMailParams = {
    to: data.new.email,
    // to: "breytex+needmask@gmail.com",
    ...mailTextParams,
  };

  await sendMail(mailParams);

  return res.end();
});
