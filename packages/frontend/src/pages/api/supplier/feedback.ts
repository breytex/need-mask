import { getFeedbackMail } from "./../../../mails/feedback";
import { Supplier } from "../../../types/Supplier";
import { createWebhooookHandler } from "../utils/createWebhooookHandler";
import { sendMail, SendMailParams } from "../utils/sendMail";

export default createWebhooookHandler<Supplier>(async (req, res) => {
  const { data } = req.body.event;
  if (data.old.status !== "pending" || data.new.status !== "feedback") {
    return res.end(
      "Row's status was not switched from pending to feedback; this is a no-op."
    );
  }

  const mailTextParams = getFeedbackMail(data.new.id, data.new.email);
  const mailParams: SendMailParams = {
    // to: data.new.email,
    to: "breytex+needmask@gmail.com",
    ...mailTextParams,
  };

  await sendMail(mailParams);

  return res.end();
});
