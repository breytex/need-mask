const createErrors = <T extends { [key: string]: string }, U = keyof T>(codes: T) => (key: U) => {
  function t(_key: string) {
    if (!codes[_key] && codes[_key] !== '') {
      return { errors: [{ name, message: _key }] };
    }

    return { errors: [{ name, message: codes[_key] }] };
  }
  return t(key as unknown as string)
}

const ERROR_CODES = {
  UPLOAD: (() => createErrors({
    NUDE_MATERIAL_DETECTED: "The file couldn't be uploaded because there is too much visible skin",
    UNSUPPORTED_FILE_TYPE: "The file couldn't be uploaded because the filetype is not supported",
    SIZE_EXCEEDED: "The file is too large"
  }))()
}

export { ERROR_CODES }
