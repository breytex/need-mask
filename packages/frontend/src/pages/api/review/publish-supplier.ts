import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { getPublishedMail } from "../../../mails/published";
import { Supplier } from "../../../types/Supplier";
import { createWebhooookHandler } from "../utils/createWebhooookHandler";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { rootGraphQuery } from "../utils/rootGraphQuery";
import { GET_FULL_SUPPLIER_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import htmlToText from "html-to-text";
import crypto from "crypto";

export const PUBLISH_HASH_SALT =
  "iajkgnysfgkjkkjadgnkja___dgnknk1329185ankjkdgFIRO_DER_CHONKnk";

const UPDATE_SUPPLIER = `
    mutation UpdateSupplierStatus($id: uuid!, $status: supplierstatus) {
        update_suppliers(where: {id: {_eq: $id}}, _set: {status: $status}){affected_rows}
    }
`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { supplierId, hash, status } = req.query;

  if (status !== "published" && status !== "feedback") {
    return res.send("Status field check failed");
  }

  const compareHash = crypto
    .createHmac("sha256", PUBLISH_HASH_SALT)
    .update(supplierId)
    .digest("hex");

  if (hash !== compareHash) {
    return res.send("Hash check failed :(");
  }

  const { errors } = await rootGraphQuery(UPDATE_SUPPLIER, {
    variables: { id: supplierId, status },
  });

  if (Boolean(errors)) {
    return res.send("Graphql error");
  }
  return res.send("success");
};

// /api/review/publish-supplier?supplierId=1935891538&hash=iajdgiajdglkalkdg
