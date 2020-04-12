import { UPDATE_FILE_URL } from './../../utils/mutations';
import { GET_FILES_BY_SUPPLIER } from './../../utils/queries';
import { Supplier } from './../../../../types/Supplier';
import { s3, getEdgeUrl, bucketName, tempFolder } from '../../utils/s3'
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
    await s3.copyObject({
      Bucket: bucketName,
      CopySource: `${bucketName}/${tempFolder}/${file.url}`,
      Key: newURL,
      ACL: "public-read",
    }).promise()
    await graphQuery(UPDATE_FILE_URL, { fileId: file.id, newURL: getEdgeUrl(newURL) })
    await s3.deleteObject({
      Bucket: bucketName,
      Key: `/${tempFolder}/${file.url}`
    }).promise()
    results.push({
      old: file,
      new: {
        ...file,
        url: getEdgeUrl(newURL)
      }
    })
  }

  res.send(results)
});

