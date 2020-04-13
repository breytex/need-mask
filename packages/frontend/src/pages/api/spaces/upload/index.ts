import { NextApiRequest, NextApiResponse } from "next";
import MultiParty from "multiparty";
import { handleFile } from "./handleFile";
import { randomBytes } from "crypto";
import { s3, bucketName, tempFolder } from "../../utils/s3";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const form = new MultiParty.Form();

  form.on("part", async function (part) {
    if (part.filename) {
      /**
       * Catches multiple files in an upload.
       * Sadly we cannot send an error to the user because we already sent them an response
       */
      if (res.headersSent) return;

      const { errors, data, mimeType } = await handleFile(part);
      if (errors) {
        return res.status(403).send(errors);
      }
      const hashedFilename = `${randomBytes(4).toString("hex")}--${
        part.filename
      }`;
      await s3
        .upload({
          Bucket: bucketName,
          Key: `${tempFolder}/${hashedFilename}`,
          ContentType: mimeType,
          Body: data,
          ACL: "public-read",
        })
        .promise();
      res.send({ fileName: hashedFilename });
    }
  });

  form.on("error", (error) => {
    console.error(error);
    res.status(400).send({ errors: [error] });
  });

  form.parse(req);
};
