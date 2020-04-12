export const ADD_SUPPLIER = `
    mutation MyMutation($data: [suppliers_insert_input!]!) {
        insert_suppliers(objects: $data){
            affected_rows
        }
    }  
`;

/*

Expected format for `$data`:

{
  "data": {
      "city": "test",
      "companyName": "test1",
      "continent": "Europe",
      "country": "test3",
      "email": "test422",
      "firstName": "test5", 
      "lastName": "test6", 
      "zip": "test7",
      "street":"test8",
      "vatNumber":"test9",
      "products": {
        "data": [
          {
            "typeId": "b32a31ac-919e-408e-971d-89710de2562a",
            "leadTime": 10,
            "maxPrice": 10, 
            "minOrderAmount": 10,
            "minPrice": 10, 
            "description": "testest", 
            "capacity": 10
          },
          {
            "typeId": "62624845-9025-433b-aca8-440e0f7cca0f",
            "leadTime": 10,
            "maxPrice": 10, 
            "minOrderAmount": 10,
            "minPrice": 10, 
            "description": "testest2", 
            "capacity": 10
          }
        ]
      }
    }
}

*/
