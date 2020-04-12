import { GET_SUPPLIER_WITH_CODE } from "./../utils/queries";
import { NextApiResponse, NextApiRequest } from "next";
import { graphQuery } from "../utils/graphQuery";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_MS } from "../../../constants/expireTimes";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.email) {
    res.statusCode = 403;
    res.end("Email missing in request");
    return;
  }
  if (!req.body.code) {
    res.statusCode = 403;
    res.end("Code missing in request");
    return;
  }
  let suppliersResponse;
  try {
    suppliersResponse = await graphQuery(GET_SUPPLIER_WITH_CODE, {
      email: req.body.email,
      code: req.body.code,
    });
  } catch (e) {
    res.statusCode = 404;
    res.end("Error requesting supplier");
    return;
  }

  if (!suppliersResponse || suppliersResponse.data.suppliers.length === 0) {
    res.statusCode = 404;
    res.end("Could not find supplier with that email and code");
    return;
  }

  const supplier = suppliersResponse.data.suppliers[0];

  if (!supplier.loginCodes || supplier.loginCodes.length === 0) {
    res.statusCode = 404;
    res.end("Could not find supplier with that email and code"); // yes, same error to obfuscate
    return;
  }

  const loginCode = supplier.loginCodes[0];

  const loginCodeCreated = new Date(loginCode.createdAt).getTime();
  const now = new Date().getTime();
  const expireMS = 1000 * 60 * 10; // 10 min
  if (loginCodeCreated + expireMS < now) {
    res.statusCode = 404;
    res.end("Could not find supplier with that email and code"); // yes, same error to obfuscate
    return;
  }

  const jwt = sign(
    {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": "user",
      "X-Hasura-User-Id": supplier.id,
      "X-Hasura-Jwt-Version": "1",
      expiresIn: ACCESS_TOKEN_EXPIRE_MS,
    },
    process.env.ACCESS_TOKEN_SECRET
  );

  res.end(JSON.stringify({ jwt }));
  return;
};
