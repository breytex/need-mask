import { NextApiRequest } from "next";
import { IncomingHttpHeaders } from "http";

interface BodyData<T> {
  table: {
    name: string;
  };
  event: {
    op: "INSERT" | "UPDATE" | "DELETE";
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
