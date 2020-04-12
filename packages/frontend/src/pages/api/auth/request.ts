import { ADD_LOGINCODE } from "./../utils/mutations";
import { GET_SUPPLIER } from "./../utils/queries";
import { getLoginRequestMail } from "./../../../mails/loginRequest";
import { NextApiResponse, NextApiRequest } from "next";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { graphQuery } from "../utils/graphQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.email) {
    res.statusCode = 403;
    res.end("Email missing in request");
    return;
  }
  let suppliersResponse;
  try {
    suppliersResponse = await graphQuery(GET_SUPPLIER, {
      email: req.body.email,
    });
  } catch (e) {
    res.statusCode = 404;
    res.end("Error requesting supplier");
    return;
  }

  if (!suppliersResponse || suppliersResponse.data.suppliers.length === 0) {
    res.statusCode = 404;
    res.end("Supplier not found");
    return;
  }

  const supplier = suppliersResponse.data.suppliers[0];

  let code = Math.floor(Math.random() * 1e6);
  if (code < 1000000) {
    code = code + 100000;
  }

  //   const codeString = "" + code; // to string
  const codeString = "123456";

  const addResponse = await graphQuery(ADD_LOGINCODE, {
    supplierId: supplier.id,
    code: codeString,
  });

  const mailTextParams = getLoginRequestMail(codeString);
  const mailParams: SendMailParams = {
    to: req.body.email,
    ...mailTextParams,
  };

  sendMail(mailParams);

  res.end("success");
  return;
};
