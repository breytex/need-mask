// import AWS from 'aws-sdk'
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

// const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
// const s3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.SPACES_KEY,
//   secretAccessKey: process.env.SPACES_SECRET
// });

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  console.log(req.body)
  const dataString = Buffer.from(req.body)
  res.setHeader("Content-Type", "application/json");
  fs.writeFileSync('TestImage.jpg', dataString);
  res.send(JSON.stringify({ pong: "John Doe" }));
};
