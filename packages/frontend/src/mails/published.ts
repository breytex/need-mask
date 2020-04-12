export const getPublishedMail = (supplierId: string, email: string) => {
  const text = `
    Your listing on need-mask.com has been reviewed and published.
    You can access it here: https://app.need-mask.com/suppliers/${supplierId}
    If you want to update or review the listing, you can do that here: https://app.need-mask.com/suppliers/edit/${supplierId}?email=${email}
  `;
  const html = `
    Your listing on need-mask.com has been reviewed and published.<br/>
    You can access it here: https://app.need-mask.com/suppliers/${supplierId}<br/>
    If you want to update or review the listing, you can do that here: https://app.need-mask.com/suppliers/edit/${supplierId}?email=${email}<br/>
    `;

  return { text, html };
};
