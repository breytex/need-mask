export const getFeedbackMail = (
  supplierId: string,
  email: string,
  feedback?: string
) => {
  const text = `
  Your listing on need-mask.com has been reviewed and unfortunately does not meet our current standards. Please review your application using the following link.\r\n
  \r\n
  Make sure to provide:\r\n
  - Valid personal information and contact details\r\n
  - Valid company details\r\n
  - At least one good image showing your product\r\n
  - Suitable product details like price, weekly capacity and minimum order amount\r\n
  \r\n
  ${
    feedback
      ? `The moderator left the following feedback for you: \r\n
  ${feedback}\r\n`
      : ""
  }
  \r\n
  Take your time adjusting your listing and submit it again.\r\n
  Use this link to login to your listing:\r\n
  https://need-mask.com/suppliers/edit?supplierId=${supplierId}&email=${email} \r\n
  \r\n
  \r\n
  Thank you for listing your offering on need-mask.com
    `;

  const html = `
  Your listing on need-mask.com has been reviewed and unfortunately does not meet our current standards. Please review your application using the following link.<br/>
  <br/>
  Make sure to provide:<br/>
  - Valid personal information and contact details<br/>
  - Valid company details<br/>
  - At least one good image showing your product<br/>
  - Suitable product details like price, weekly capacity and minimum order amount<br/>
  <br/>
  ${
    feedback
      ? `The moderator left the following feedback for you: <br/>
  ${feedback}  <br/>`
      : ""
  }
  <br/>
  Take your time adjusting your listing and submit it again.<br/>
  Use this link to login to your listing:<br/>
  <a href="https://need-mask.com/suppliers/edit?supplierId=${supplierId}&email=${email}">Click here to review your listing</a> <br/>
  <br/>
  <br/>
  Thank you for listing your offering on need-mask.com
  `;

  const subject = "Your listing application has been denied 😢";

  return { text, html, subject };
};
