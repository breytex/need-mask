type ERROR_CODES = {
  NUDE_MATERIAL_DETECTED: "The file couldn't be uploaded because there is too much visible skin",
  UNSUPPORTED_FILE_TYPE: "The file couldn't be uploaded because the filetype is not supported"
  SIZE_EXCEEDED: "The file is too large"
}
const ERROR_CODES = {
  NUDE_MATERIAL_DETECTED: "The file couldn't be uploaded because there is too much visible skin",
  UNSUPPORTED_FILE_TYPE: "The file couldn't be uploaded because the filetype is not supported",
  SIZE_EXCEEDED: "The file is too large"
}

const createUploadError = (name: keyof ERROR_CODES) => ({ errors: [{ name, message: ERROR_CODES[name] }] })
export { ERROR_CODES, createUploadError }
