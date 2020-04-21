import { Supplier } from "../../../types/Supplier";
import { createWebhooookHandler } from "../utils/createWebhooookHandler";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { rootGraphQuery } from "../utils/rootGraphQuery";
import { GET_FULL_SUPPLIER_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import htmlToText from "html-to-text";
import crypto from "crypto";
import { PUBLISH_HASH_SALT } from "./publish-supplier";
import { sendNotification } from "../utils/slackNotification";

const format = (num) => new Intl.NumberFormat("en-US").format(num || 0);

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default createWebhooookHandler<Supplier>(async (req, res) => {
  const { data: requestData } = req.body.event;
  if (requestData.new.status !== "pending") {
    return res.end("New row is not status pending. This is a no-op.");
  }

  await sleep(20000); // sleep 20 sek to allow file move webhook to move all the files...

  const { data, errors } = await rootGraphQuery<{
    data: { suppliers_by_pk: Supplier };
    errors: any[];
  }>(GET_FULL_SUPPLIER_WITH_PRODUCTS(requestData.new.id));
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
      <a href="https://need-mask.com/api/review/publish-supplier?supplierId=${
        supplier.id
      }&hash=${hash}&status=published">Publish</a><br/><br/>
      <a href="https://need-mask.com/api/review/publish-supplier?supplierId=${
        supplier.id
      }&hash=${hash}&status=feedback">Needs rework</a>
    `;

    return acc + productStr;
  }, ``);

  const html = `
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
    subject: "A new supplier joined 🚀",
    html,
    text: htmlToText.fromString(html),
  };

  await sendMail(mailParams);
  await sendNotification({
    text: `New supplier 🚀 - ${supplier.firstName} ${supplier.lastName}, ${
      supplier.companyName
    }, ${supplier.web || ""}`,
  });

  return res.end();
});
