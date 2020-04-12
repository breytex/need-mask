import { IncomingMessage, ServerResponse } from "http";

interface RequestBody {
  body: any;
}
type Request = IncomingMessage & RequestBody;

export default async (req: Request, res: ServerResponse) => {
  res.end(JSON.stringify(req.body));
  return;
};
