import { Supplier } from "./Supplier";

export type RequestProducts = {
  id: string;
  createdAt: string;
  updatedAt: string;
  requestId: string;
  productId: string;
  amount: number;
  request?: Request;
  supplier: Supplier;
};

export type Request = {
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
  products?: RequestProducts[];
};
