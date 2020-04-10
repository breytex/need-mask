import { Supplier } from "../../types/Supplier";
export const LISTINGS_PER_PAGE = 3;

export const GET_LISTINGS_FN = (productType = false) => {
  const filterByProductParam = productType
    ? `, $productTitleArray: [String!]`
    : "";

  const filterByProductWhere = productType
    ? `, where: {products: {productType: {title: {_in: $productTitleArray}}}},`
    : "";

  const test = `query GetListings($offset:Int${filterByProductParam}) {
            suppliers(limit: ${LISTINGS_PER_PAGE}, offset: $offset${filterByProductWhere}) {
                id 
                country
                companyName
                zip
                products {
                id
                capacity
                description
                leadTime
                maxPrice
                minOrderAmount
                minPrice
                title
                unit
                createdAt
                createdAt
                updatedAt
                productType {
                    id
                    title
                    description
                    createdAt
                    updatedAt
                }
                }
            }
            suppliers_aggregate{aggregate{count}}
        }
    `;
  console.log({ test });
  return test;
};

export interface SupplierResponse {
  suppliers: Supplier[];
}
