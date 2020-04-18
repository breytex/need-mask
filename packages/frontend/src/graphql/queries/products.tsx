import { ProductType } from "../../types/Product";

// export const GET_PRODUCT_TYPES = /* GraphQL */ `
//   query GetProductTypes {
//     productTypes {
//       title
//       subTypes
//       id
//     }
//   }
// `;

export interface ProductTypeResponse {
  productTypes: ProductType[];
}

// Hardcoded product types, saving one request per user
// TODO: move that into getStaticProps of _app.tsx when this feature becomes available.
// https://github.com/zeit/next.js/discussions/10949
export const productTypes: ProductType[] = [
  {
    title: "Mask",
    subTypes:
      "KN95 R – no valve, KN95 R – with valve, KN95 NR – no valve, KN95 NR – with valve, FFP 2 NR – no valve, FFP 2 NR – with valve, FFP 2 R – no valve, FFP 2 R – with valve, Surgical mask – EN 14683 Typ II, Not certified",
    id: "82117589-5307-41f7-9652-9bd3347a3577",
  },
  {
    title: "Clothing",
    subTypes: "Surgical gown, Disposable gloves",
    id: "ec682fcb-dabe-457c-bc5c-0e2d38088809",
  },
  {
    title: "Headgear",
    subTypes: "Safety glasses, Face shield",
    id: "bbb96ec3-1b0c-4ae5-9b79-78ca7bad059f",
  },
];
