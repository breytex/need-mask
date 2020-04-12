export const ADD_REQUEST = `
    mutation AddRequest($data: [requests_insert_input!]!) {
        insert_requests(objects: $data){
            affected_rows
        }
    }  
`;
