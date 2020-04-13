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
  const errors = []
  for (const file of files) {
    try {
      const newURL = `${supplierId}/${file.url}`
      const currentKey = `${tempFolder}/${file.url}`

      // Check if the object even exists
      await s3.headObject({
        Bucket: bucketName,
        Key: currentKey
      }).promise().catch(error => {
        throw [{ ...error, file }]
      })
      // If it does we know we can copy it
      await s3.copyObject({
        Bucket: bucketName,
        CopySource: `${bucketName}/${currentKey}`,
        Key: newURL,
        ACL: "public-read",
      }).promise().catch(error => {
        throw [{ ...error, file }]
      })

      // After it successfully copied we update our database
      const { errors } = await graphQuery(UPDATE_FILE_URL, { fileId: file.id, newURL: getEdgeUrl(newURL) })
      if (errors) throw errors

      // And only then delete the object since we ensured that it exists, is copied and that our database has the new url
      await s3.deleteObject({
        Bucket: bucketName,
        Key: `${tempFolder}/${file.url}`
      }).promise().catch(error => {
        throw [{ ...error, file }]
      })

      // If everything went as planned we can push a successfull result
      results.push({
        old: file,
        new: {
          ...file,
          url: getEdgeUrl(newURL)
        }
      })
    } catch (error) {
      // Otherwise we push our error into our errors array
      errors.push(...error)
    }
  }

  /**
   * If there is an error we set the status to 4xx so Hasura retries
   * Our hook is written in a way that previous partial successes are handled properly
   **/
  if (errors.length) res.status(400)
  res.send({ results, errors })
});

