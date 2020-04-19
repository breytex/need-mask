export const getPublishedMail = (supplierId: string, email: string) => {
  const text = `
    Your listing on need-mask.com has been reviewed and published.
    You can access it here: https://need-mask.com/suppliers/${supplierId}
    If you want to update or review the listing, you can do that here: https://need-mask.com/suppliers/edit?supplierId=${supplierId}&email=${email}
  `;
  const html = `
    Your listing on need-mask.com has been reviewed and published.<br/>
    You can access it here: https://need-mask.com/suppliers/${supplierId}<br/>
    If you want to update or review the listing, you can do that here: https://need-mask.com/suppliers/edit?supplierId=${supplierId}&email=${email}<br/>
    `;
  const subject = "Your listing application has been approved! 🎉";

  return { text, html, subject };
};
