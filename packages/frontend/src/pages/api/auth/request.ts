import { ADD_LOGINCODE } from "./../utils/mutations";
import { GET_SUPPLIER } from "./../utils/queries";
import { getLoginRequestMail } from "./../../../mails/loginRequest";
import { NextApiResponse, NextApiRequest } from "next";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { graphQuery } from "../utils/graphQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body
  if (!email) {
    return res.status(403).send('Email missing in request')
  }
  const code = Math.max(1e5, Math.floor(Math.random() * 1e6)).toString()
  const codeString = "123456";

  const suppliersResponse = await graphQuery(GET_SUPPLIER, { email })
  if (!suppliersResponse || suppliersResponse.data.suppliers.length === 0) {
    return res.status(404).send("Supplier not found")
  }

  const supplier = suppliersResponse.data.suppliers[0];
  const addResponse = await graphQuery(ADD_LOGINCODE, {
    supplierId: supplier.id,
    code: codeString,
  });

  const mailTextParams = getLoginRequestMail(codeString);
  const mailParams: SendMailParams = {
    to: req.body.email,
    ...mailTextParams,
  };

  await sendMail(mailParams);

  return res.end();
};
