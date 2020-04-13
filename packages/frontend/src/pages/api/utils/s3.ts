import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: "https://fra1.digitaloceanspaces.com",
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

const bucketName = "need-mask";
const getEdgeUrl = (path) =>
  `https://${bucketName}.fra1.cdn.digitaloceanspaces.com/${path}`;
const tempFolder = "definitelyNotTemp";
const getPath = (url: string) => {
  const match = url.match(/digitaloceanspaces.com\/(.*)/)
  if (match) return match[2]
}
export { s3, bucketName, getEdgeUrl, getPath, tempFolder };
