import { NextApiResponse } from "next";
import { WebhookRequest } from "../../../types/webhooks";

type WebhookHandler<T> = {
  (req: WebhookRequest<T>, res: NextApiResponse): any;
};

export function createWebhookHandler<T>(
  next: WebhookHandler<T>
): WebhookHandler<T> {
  return (req, res) => {
    if (req.headers.webhooksecret !== process.env.WEBHOOK_AUTH_SECRET) {
      return res.status(403).send({ error: "Webhook Secret is wrong" });
    }
    next(req, res);
  };
}
