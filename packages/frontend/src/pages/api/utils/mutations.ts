export const ADD_LOGINCODE = `
  mutation ($code: bpchar, $supplierId:uuid) {
    insert_loginCodes(objects: {code: $code, supplierId: $supplierId}){affected_rows}
  }
`;
