import { rootGraphQuery } from "./../utils/rootGraphQuery";
import { GET_SUPPLIER_WITH_CODE } from "./../utils/queries";
import { NextApiResponse, NextApiRequest } from "next";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_MS } from "../../../constants/expireTimes";
import { Supplier } from "../../../types/Supplier";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, code } = req.body;
  if (!email) {
    return res.status(403).send("Email missing in request");
  }
  if (!code) {
    return res.status(403).send("Code missing in request");
  }

  const suppliersResponse = await rootGraphQuery<{
    variables: {
      data: { suppliers: Supplier[] };
    };
  }>(GET_SUPPLIER_WITH_CODE, { email });
  if (!suppliersResponse || suppliersResponse.data.suppliers.length === 0) {
    return res.status(404).send("Supplier not found");
  }

  const supplier = suppliersResponse.data.suppliers[0];
  if (supplier.loginCodes.length === 0) {
    return res
      .status(404)
      .send("Could not find supplier with that email and code");
  }

  const loginCode = supplier.loginCodes[0];

  const loginCodeCreated = new Date(loginCode.createdAt).getTime();
  const now = new Date().getTime();
  const expireMS = 1000 * 60 * 10; // 10 min
  if (loginCodeCreated + expireMS < now) {
    return res.status(404).send("Code is expired");
  }

  const jwt = sign(
    {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user", "anonymous"],
        "X-Hasura-User-Id": supplier.id,
        "X-Hasura-Jwt-Version": "1",
      },
      expiresIn: ACCESS_TOKEN_EXPIRE_MS * 10,
      iss: "need-mask.com",
    },
    process.env.ACCESS_TOKEN_SECRET
  );

  return res.send({ jwt });
};
