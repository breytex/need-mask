export enum ProductType {
  ffp2 = "Ffp2 masks",
  clothes = "Clothes",
  shoes = "Shoes",
}

export interface Product {
  type: ProductType;
  price: number;
  volume: number;
}

export interface Listing {
  company: string;
  products: Product[];
  location: string;
}

const mockProduct: Product = {
  type: ProductType.ffp2,
  price: 3123, // 31,23€
  volume: 10000, // 10.000 / week
};

const mockProduct2: Product = {
  type: ProductType.clothes,
  price: 3123, // 31,23€
  volume: 10000, // 10.000 / week
};

export const mockListing: Listing = {
  company: "Foo Bar Company GmbH",
  location: "Aachen, Germany",
  products: [mockProduct, mockProduct2],
};
