import { rootGraphQuery } from "./../utils/rootGraphQuery";
import {
  RequestProduct,
  SupplierRequest,
} from "../../../types/SupplierRequest";
import { authWebhook } from "../utils/authWebhook";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { createWebhooookHandler } from "../utils/createWebhooookHandler";
import { GET_REQUEST_PRODUCTS_BY_REQUEST } from "../../../graphql/queries/requestProducts";
import request from "../auth/request";

// Todo: Make a style function a la `style(padding(5), marginLeft(-3)) that creates an inline style for that
const withPadding = amount => `style="padding: ${amount}px"`

const withFont = child => `
<font style="font-family:sans-serif;font-size:12px">
  ${child}
</font>`

const styledTable = children => `
<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FEFEFE">
  ${children}
</table>
`

const renderValue = (value) => {
  if (typeof value === "object" && value !== null) {
    return styledTable(Object.entries(value).map(styledProperty).join(''))
  }
  return `<td>${withFont(value)}</td>`
}

const styledProperty = ([key, value]) => `
<tr bgcolor="#EAF2FA">
  <td colspan="2" ${withPadding(5)}>
    ${withFont(`<strong>${key}</strong>`)}
  </td>
</tr>
<tr>
  <td width="20" ${withPadding(5)}>&nbsp;</td>
  ${renderValue(value)}
</tr>`


const handler = createWebhooookHandler<SupplierRequest>(async (req, res) => {
  const {
    new: { id, email, phoneNumber, firstName, lastName },
  } = req.body.event.data;

  const {
    data,
    errors,
  } = await rootGraphQuery<{
    data: { requestProducts: RequestProduct[] };
    errors: any[];
  }>(GET_REQUEST_PRODUCTS_BY_REQUEST, { requestId: id });

  if (errors) return res.send(errors);
  const { requestProducts } = data
  if (!requestProducts.length)
    return res.send("No request with that id found");

  const { supplier } = requestProducts[0].product;
  if (!supplier) {
    return res.send("Supplier not found 😱");
  }

  const subject = `${firstName} ${lastName} requested product information 📦`;

  const withNiceNames = requestProducts.map(requestProduct => {
    return {
      "Amount": requestProduct.amount,
      "Product name": requestProduct.product.title,
      "Product type": requestProduct.product.productType.title,
    }
  })

  const requestedProductsTable = styledTable(Object.entries(withNiceNames).map(styledProperty).join(''))
  const html = /* JSX */ `Dear supplier,<br />you got a new request from need-mask.com. Please contact the below mentioned contact person, who asked for an offer. We are not liable for any transaction.<br />Thank you for listing your offering on https://need-mask.com<br /> <br />
    <strong>Contact Information</strong> <br />
    ${firstName} ${lastName}, ${email}, ${phoneNumber} <br /> <br />

    <strong>Requested products:</strong>
    ${requestedProductsTable}
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
    to: supplier.email,
    subject,
    text,
    html,
  };

  await sendMail(mailParams);
  return res.end();
});

export default authWebhook(handler);
