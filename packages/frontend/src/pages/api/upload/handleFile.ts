import Sharp from 'sharp'
import { ERROR_CODES } from '../utils/errorCodes'
import MultiParty from 'multiparty'
import streamToBuffer from '../utils/streamToBuffer'

const createUploadError = ERROR_CODES.UPLOAD

type SupportedContentTypes =
  | "image/png"
  | "image/jpeg"
  | "application/pdf"

type handleFileReturn =
  ReturnType<typeof createUploadError> & { data?: undefined, mimeType?: undefined }
  | { data: Buffer, mimeType: SupportedContentTypes, errors?: undefined }

async function handleFile(file: MultiParty.Part): Promise<handleFileReturn> {
  console.log(file.byteCount)
  if (file.byteCount > 1024 * 1024)
    return createUploadError('SIZE_EXCEEDED')
  const buffer = await streamToBuffer(file)
  const getMimeType = (): SupportedContentTypes => {
    const signature = buffer.slice(0, 8).toString('hex').toUpperCase()
    console.log(signature)
    switch (signature.substr(0, 8)) {
      case '89504E47':
        if (signature !== '89504E470D0A1A0A')
          return undefined
        return 'image/png'
      case 'FFD8FFD8':
      case 'FFD8FFE0':
      case 'FFD8FFE1':
      case 'FFD8FFE2':
      case 'FFD8FFE3':
        return 'image/jpeg'
      case '25504446':
        return 'application/pdf'
      default:
        return undefined
    }
  }
  const mimeType = getMimeType()
  if (!mimeType) return createUploadError('UNSUPPORTED_FILE_TYPE')
  if (mimeType !== 'image/png' && mimeType !== 'image/jpeg')
    return { data: buffer, mimeType }

  // Commented out for now, needs further testing because of false positives
  // const isNude = Nude.scan(buffer) as boolean
  // if (isNude) {
  //   console.log(file.filename)
  //   return createUploadError('NUDE_MATERIAL_DETECTED')
  // }

  return {
    data: await Sharp(buffer).resize(400, 400).toBuffer(),
    mimeType
  }
}
export { handleFile }
