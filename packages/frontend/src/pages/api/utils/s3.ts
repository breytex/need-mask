import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  endpoint: "https://fra1.digitaloceanspaces.com",
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

export { s3 }
