import { rootGraphQuery } from "./../utils/rootGraphQuery";
import {
  RequestProduct,
  SupplierRequest,
} from "../../../types/SupplierRequest";
import { authWebhook } from "../utils/authWebhook";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { createWebhooookHandler } from "../utils/createWebhooookHandler";
import { GET_REQUEST_PRODUCTS_BY_REQUEST } from "../../../graphql/queries/requestProducts";

const handler = createWebhooookHandler<SupplierRequest>(async (req, res) => {
  const { data } = req.body.event;

  const {
    new: { id, email, phoneNumber, firstName, lastName },
  } = data;

  // todo catch error
  const {
    data: { requestProducts },
  } = await rootGraphQuery<{ data: { requestProducts: RequestProduct[] } }>(
    GET_REQUEST_PRODUCTS_BY_REQUEST,
    { requestId: id }
  );

  const subject = `${firstName} ${lastName} requested product information 📦`;

  const html = /* JSX */ `
    <strong>Contact Information</strong> <br>
    ${firstName} ${lastName}, ${email}, ${phoneNumber} <br /> <br />

    <strong>Requested products:</strong>
    <ul>
      ${requestProducts.map(
        (requestedProduct) =>
          `<li>${requestedProduct.product.title}, ${requestedProduct.amount}</li>`
      )}
    </ul>
  `;

  const text = `
   Contact Information \n
   ${firstName} ${lastName}, ${email}, ${phoneNumber} \n\n
   Requested products:\n
   ${requestProducts.map(
     (requestedProduct) =>
       `${requestedProduct.product.title}, ${requestedProduct.amount}\n`
   )}
  `;

  const mailParams: SendMailParams = {
    to: data.new.email,
    subject,
    text,
    html,
  };

  await sendMail(mailParams);
  return res.end();
});

export default authWebhook(handler);
