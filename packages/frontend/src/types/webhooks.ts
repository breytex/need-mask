import { NextApiRequest } from "next";
import { IncomingHttpHeaders } from "http";

interface BodyData<T> {
  table: {
    name: string;
  };
  event: {
    op: string; // operation (e.g. "INSERT", "UPDATE", "DELETE", "CREATE")
    data: {
      old: T;
      new: T;
    };
  };
}

interface WebhookHeaders extends IncomingHttpHeaders {
  webhooksecret: string;
}

export interface WebhookRequest<T> extends NextApiRequest {
  body: BodyData<T>;
  headers: WebhookHeaders;
}
