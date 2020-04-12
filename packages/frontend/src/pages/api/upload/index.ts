// import AWS from 'aws-sdk'
import AWS from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'
import MultiParty from 'multiparty'
import { handleFile } from './handleFile'

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
  const form = new MultiParty.Form()

  form.on('part', async function (part) {
    if (part.filename) {
      const { errors, data, mimeType } = await handleFile(part)
      if (errors) {
        return res.status(403).send(errors)
      }

      const params = {
        Bucket: "need-mask",
        Key: part.filename,
        ContentType: mimeType,
        Body: data
      }
      const result = await s3.upload(params).promise()
      res.send({ url: result.Location })
    }
  })

  form.on('error', (error) => {
    console.error(error)
    res.status(400).send({ errors: [error] });
  })

  form.parse(req)
};
