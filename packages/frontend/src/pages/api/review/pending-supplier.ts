import { getPublishedMail } from "../../../mails/published";
import { Supplier } from "../../../types/Supplier";
import { createWebhooookHandler } from "../utils/createWebhooookHandler";
import { sendMail, SendMailParams } from "../utils/sendMail";
import { rootGraphQuery } from "../utils/rootGraphQuery";
import { GET_FULL_SUPPLIER_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import htmlToText from "html-to-text";

export default createWebhooookHandler<Supplier>(async (req, res) => {
  const { data: requestData } = req.body.event;
  if (requestData.new.status !== "pending") {
    return res.end("New row is not status pending. This is a no-op.");
  }

  const { data, errors } = await rootGraphQuery<{
    data: { suppliers_by_pk: Supplier };
    errors: any[];
  }>(GET_FULL_SUPPLIER_WITH_PRODUCTS(requestData.new.id));
  const supplier = data.suppliers_by_pk;

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
      productType: ${next.productType} <br/>  
      minPrice: ${next.minPrice} <br/>  
      maxPrice: ${next.maxPrice} <br/>  
      capacity: ${next.capacity} <br/>  
      minOrderAmount: ${next.minOrderAmount} <br/>  
      leadTime: ${next.leadTime} <br/>  
      supplierId: ${next.supplierId} <br/>  
      supplier: ${next.supplier} <br/>  
      createdAt: ${next.createdAt} <br/>  
      updatedAt: ${next.updatedAt} <br/>  
      files:
      ${fileString}
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
  Web: ${supplier.email}<br/>
  VAT: ${supplier.vatNumber}<br/>
  <br/><br/>
  ${products}
`;

  const mailParams: SendMailParams = {
    to: "review@need-mask.com",
    subject: "A new supplier joined 🚀",
    html,
    text: htmlToText(html),
  };

  await sendMail(mailParams);

  return res.end();
});
