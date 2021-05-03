import { Report } from "./../../../types/Report";
import { Supplier } from "../../../types/Supplier";
import { createWebhookHandler } from "../utils/createWebhooookHandler";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { rootGraphQuery } from "../utils/rootGraphQuery";
import { GET_FULL_SUPPLIER_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import htmlToText from "html-to-text";
import crypto from "crypto";
import { PUBLISH_HASH_SALT } from "../review/publish-supplier";
import { sendNotification } from "../utils/slackNotification";

const format = (num) => new Intl.NumberFormat("en-US").format(num || 0);

export default createWebhookHandler<Report>(async (req, res) => {
  const { data: requestData } = req.body.event;

  const { data, errors } = await rootGraphQuery<{
    data: { suppliers_by_pk: Supplier };
    errors: any[];
  }>(GET_FULL_SUPPLIER_WITH_PRODUCTS(requestData.new.supplierId));
  const supplier = data.suppliers_by_pk;

  if (Boolean(errors)) {
    return res.end("Supplier not found");
  }

  const hash = crypto
    .createHmac("sha256", PUBLISH_HASH_SALT)
    .update("" + supplier.id)
    .digest("hex");

  const products = supplier.products.reduce((acc, next) => {
    const fileString = next.files.reduce((files, file) => {
      const f = `
              <a href="${file.file?.url}" target="_blank">${
        file.file?.url.split("/").splice(-1)[0]
      }</a><br/>
            `;
      return files + f;
    }, "");

    const productStr = `
      <br/>-----<br/>
      id: ${next.id} <br/>  
      title: ${next.title} <br/>  
      description: ${next.description} <br/>  
      typeId: ${next.typeId} <br/>  
      productType: ${next.productType?.title} <br/>  
      minPrice: ${next.minPrice / 100}€ <br/>  
      maxPrice: ${next.maxPrice / 100}€ <br/>  
      capacity: ${format(next.capacity)} units/week<br/>  
      minOrderAmount: ${format(next.minOrderAmount)} units<br/>  
      leadTime: ${next.leadTime} days<br/>  
      supplierId: ${next.supplierId}<br/>  
      supplier: ${next.supplier} <br/>  
      createdAt: ${next.createdAt} <br/>  
      updatedAt: ${next.updatedAt} <br/>  
      files:
      ${fileString}
      <br/><br/>
      <a href="https://need-mask.com/admin/status-feedback?supplierId=${
        supplier.id
      }&hash=${hash}">Disable the supplier and send a feedback</a><br/>
      (Feel free to do nothing, if the supplier is legitimate!)
    `;

    return acc + productStr;
  }, ``);

  const html = `
  This supplier was reported by a user. The user added this reason:<br/>
  ${requestData.new.reason}
  <br/><br/>
  Supplier:<br/>
  Company name: ${supplier.companyName}<br/>
  First name: ${supplier.firstName}<br/>
  Last name: ${supplier.lastName}<br/>
  Country: ${supplier.country}<br/>
  Continent: ${supplier.continent}<br/>
  Street: ${supplier.street}<br/>
  Street2: ${supplier.street2}<br/>
  ZIP: ${supplier.zip}<br/>
  Email: ${supplier.email}<br/>
  Web: ${supplier.web}<br/>
  VAT: ${supplier.vatNumber}<br/>
  <br/><br/>
  ${products}
`;

  const mailParams: SendMailParams = {
    to: "review@need-mask.com",
    subject: "A supplier was reported ⚠️",
    html,
    text: htmlToText.fromString(html),
  };

  await sendMail(mailParams);
  await sendNotification({
    text: `A supplier was reported ⚠️ - ${supplier.firstName} ${
      supplier.lastName
    }, ${supplier.companyName}, ${supplier.web || ""} - Reason: ${
      requestData.new.reason
    }`,
  });

  return res.end();
});
