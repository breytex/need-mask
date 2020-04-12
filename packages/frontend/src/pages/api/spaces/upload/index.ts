
import { NextApiRequest, NextApiResponse } from "next";
import MultiParty from "multiparty";
import { handleFile } from "./handleFile";
import { randomBytes } from "crypto";
import { s3 } from '../../utils/s3'
export const config = {
  api: {
    bodyParser: false,
  },
};



export default (req: NextApiRequest, res: NextApiResponse) => {
  const form = new MultiParty.Form();

  form.on("part", async function (part) {
    if (part.filename) {
      const { errors, data, mimeType } = await handleFile(part);
      if (errors) {
        return res.status(403).send(errors);
      }
      const hashedFilename = `${randomBytes(4).toString("hex")}--${part.filename}`;
      const params = {
        Bucket: "need-mask",
        Key: `definitelyNotTemp/${hashedFilename}`,
        ContentType: mimeType,
        Body: data,
        acl: "public-read",
      };
      await s3.upload(params).promise();
      res.send({ fileName: hashedFilename });
    }
  });

  form.on("error", (error) => {
    console.error(error);
    res.status(400).send({ errors: [error] });
  });

  form.parse(req);
};