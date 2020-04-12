import { SupplierRequest } from "../../../types/SupplierRequest";
import { authWebhook } from "../utils/authWebhook";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { createWebhooookHandler } from "../utils/createWebhooookHandler";

const handler = createWebhooookHandler<SupplierRequest>(async (req, res) => {
  const { data } = req.body.event;

  // todo: requestProducts fetch
  const mailParams: SendMailParams = {
    to: data.new.email,
    subject: "Supplier product information request",
    text: "todo: add some text",
    html: "todo: add some html",
  };

  await sendMail(mailParams);
  return res.end();
});

export default authWebhook(handler);
