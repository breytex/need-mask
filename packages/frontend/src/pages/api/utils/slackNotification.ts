import fetch from "isomorphic-unfetch";

type Props = {
  text: string;
  username?: string;
};

export async function sendNotification({
  text,
  username = "Request Bot",
}: Props) {
  try {
    await fetch(process.env.SLACK_REQUEST_HOOK_URL, {
      method: "POST",
      body: JSON.stringify({
        username,
        text,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}
