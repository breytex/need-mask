export const GET_SUPPLIER = `
  query getUser($email: String) {
    suppliers(where: {email: {_eq: $email}}) {
      id
    }
  }
`;

export const GET_SUPPLIER_WITH_CODE = `
  query GetSupplierByCode($code: bpchar, $email:String) {
     suppliers(where: {email: {_eq: $email}}) {
      id
      loginCodes(where: {code: {_eq: $code}}, order_by: {createdAt: desc}) {
        createdAt
      }
    }
  }  
`;

export const GET_FILES_BY_SUPPLIER = `
  query GetFilesBySupplier($supplierId: uuid!) {
    files(
      where: {
        productFiles: {
          product: {
            supplierId: {
              _eq: $supplierId
            }
          }
        }
      }
    ) {
      id
      url
    }
  }
`;
