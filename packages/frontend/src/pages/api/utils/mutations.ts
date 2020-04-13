export const ADD_LOGINCODE = `
  mutation ($code: bpchar, $supplierId:uuid) {
    insert_loginCodes(objects: {code: $code, supplierId: $supplierId}){affected_rows}
  }
`;

export const UPDATE_FILE_URL = `
  mutation UpdateFileURL($fileId: uuid!, $newURL: String!) {
    update_files(
      _set: { url: $newURL }
      where: { id: { _eq: $fileId } }
    ) {
      returning {
        url
        id
      }
    }
  }
`;
