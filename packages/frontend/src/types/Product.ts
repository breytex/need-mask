import { Supplier } from "./Supplier";

export interface Product {
  id: string;
  title?: string;
  description?: string;
  typeId: string;
  productType: ProductType;
  minPrice?: number;
  maxPrice?: number;
  capacity: number;
  minOrderAmount?: number;
  leadTime?: number;
  supplierId?: string;
  supplier?: Supplier;
  files?: Array<ProductFile>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductType {
  id: string;
  title: string;
  subTypes: string;
  products?: Array<Product>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFile {
  id: string;
  file?: File;
  fileId?: string;
  product: Product;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: string;
  fileKind: string;
  fileType: string;
  productFiles: Array<ProductFile>;
  url: string;
  createdAt: string;
  updatedAt: string;
}
