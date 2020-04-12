import { NextApiResponse } from "next";
import { WebhookRequest } from "../types/webhooks";

export const authWebhook = (next) => (
  req: WebhookRequest<any>,
  res: NextApiResponse
) => {
  console.log({ test: req.headers });
  if (req.headers.webhooksecret !== process.env.WEBHOOK_AUTH_SECRET) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "webhooksecret is wrong" }));
    return;
  }

  next(req, res);
};
