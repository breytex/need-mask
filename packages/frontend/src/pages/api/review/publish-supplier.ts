import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { rootGraphQuery } from "../utils/rootGraphQuery";
import crypto from "crypto";

const UPDATE_SUPPLIER = `
  mutation UpdateSupplierStatus($id: uuid!, $status: supplierstatus, $feedback: String) {
    update_suppliers(where: {id: {_eq: $id}}, _set: {status: $status, feedback: $feedback}){affected_rows}
  }
`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { supplierId, hash, status, msg } = req.query;

  if (status !== "published" && status !== "feedback") {
    return res.send("Status field check failed");
  }

  const compareHash = crypto
    .createHmac("sha256", process.env.PUBLISH_HASH_SALT)
    .update("" + supplierId)
    .digest("hex");

  if (hash !== compareHash) {
    return res.send("Hash check failed :(");
  }

  const { errors } = await rootGraphQuery(UPDATE_SUPPLIER, {
    id: supplierId,
    status,
    feedback: msg,
  });

  if (Boolean(errors)) {
    return res.send(errors);
  }

  return res.send("success");
};
