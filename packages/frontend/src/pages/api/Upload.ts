// import AWS from 'aws-sdk'
import AWS from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty'
export const config = {
  api: {
    bodyParser: false,
  },
}

const s3 = new AWS.S3({
  endpoint: "https://fra1.digitaloceanspaces.com",
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  const form = new multiparty.Form()

  form.on('part', async function (part) {
    if (part.filename) {
      const params = {
        Bucket: "need-mask",
        Key: part.filename,
        Body: part
      }
      const result = await s3.upload(params).promise()
      res.send({ url: result.Location })
    }
  })

  form.on('error', (err) => {
    console.error(err)
    res.status(500).send({ err });
  })

  form.parse(req)
};
