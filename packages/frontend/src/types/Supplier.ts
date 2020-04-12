export interface ProductType {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  capacity?: number;
  description?: string;
  leadTime?: number;
  maxPrice?: number;
  minOrderAmount?: number;
  minPrice?: number;
  title?: string;
  unit?: string;
  productType: ProductType;
  createdAt?: number;
  updatedAt?: number;
}

export interface Supplier {
  id: string;
  country: string;
  companyName: string;
  zip?: string;
  products?: Product[];
  city: string;
  createdAt?: number;
  updatedAt?: number;
  firstName: string;
  lastName: string;
  email: string;
  continent: string;
  published: boolean;
  street: string;
  vatNumber: string;
}
