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

enum SupplierStatus {
  PUBLISHED = "published", // Listing is live
  PENDING = "pending", // Listing was created and has to be moderated
  SUSPENDED = "suspended", // Listing was suspended by user
  DELETED = "deleted",
  INACTIVE = "inactive", // Listing was suspended by admin
  FEEDBACK = "feedback", // Listing was moderated and needs changes
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
  street: string;
  vatNumber: string;
  status?: SupplierStatus;
}
