import { UPDATE_FILE_URL } from './../../utils/mutations';
import { GET_FILES_BY_SUPPLIER } from './../../utils/queries';
import { Supplier } from './../../../../types/Supplier';
import { randomBytes } from 'crypto';
import { s3 } from '../../utils/s3'
import { createWebhooookHandler } from "../../utils/createWebhooookHandler";
import { graphQuery } from "../../utils/graphQuery";

export default createWebhooookHandler<Supplier>(async (req, res) => {
  const { new: insertedSupplier } = req.body.event.data;
  const supplierId = insertedSupplier.id
  const { data: { files } } = await graphQuery(GET_FILES_BY_SUPPLIER, { supplierId })
  if (!files.length) {
    return res.send("No files to move found")
  }
  const results = []
  for (const file of files) {
    const newURL = `${supplierId}/${file.url}`
    const params = {
      Bucket: 'need-mask',
      CopySource: `need-mask/definitelyNotTemp/${file.url}`,
      Key: newURL
    };
    const result = await s3.copyObject(params).promise()
    results.push(result)
    // await graphQuery(UPDATE_FILE_URL, {fileId: file.id, newURL })
  }

  res.send(results)
});

