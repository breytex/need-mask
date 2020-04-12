export const getLoginRequestMail = (loginCode: string) => {
  const text = `
    You have requested to log into your account on need-mask.com.
    Please type the following code into the text field and hit "Login".
    ${loginCode}
  `;
  const html = `
  You have requested to log into your account on need-mask.com.<br/>
  Please type the following code into the text field and hit "Login".<br/>
  <b>${loginCode}</b>
    `;
  const subject = "Your key to login 🗝";

  return { text, html, subject };
};
