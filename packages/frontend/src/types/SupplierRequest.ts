import { Product, Supplier } from "./Supplier";

export type RequestProduct = {
  id: string;
  createdAt: string;
  updatedAt: string;
  requestId: string;
  productId: string;
  amount: number;
  request?: SupplierRequest;
  supplier: Supplier;
  product: Product;
};

export type SupplierRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  zip: string;
  street: string;
  city: string;
  continent: string;
  companyType: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  products?: RequestProduct[];
};
