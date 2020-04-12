import { WebhookRequest } from "../../../types/webhooks";
import { NextApiResponse } from "next";
import { Supplier } from "../../../types/Supplier";
import { authWebhook } from "../../../api-helpers/authWebhook";

const handler = async (req: WebhookRequest<Supplier>, res: NextApiResponse) => {
  const { data } = req.body.event;
  if (data.old.published !== false || data.new.published !== true) {
    res.end(
      "Row's published was not switched from false to true; this is a no-op."
    );
    return;
  }

  res.end("success");
  return;
};

export default authWebhook(handler);
