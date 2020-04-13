import { Continent } from './Geographic';
import { Product } from './Product';

export enum SupplierStatus {
  PUBLISHED = "published", // Listing is live
  PENDING = "pending", // Listing was created and has to be moderated
  SUSPENDED = "suspended", // Listing was suspended by admin
  DELETED = "deleted",
  INACTIVE = "inactive", // Listing was suspended by user
  FEEDBACK = "feedback", // Listing was moderated and needs changes
}

export interface Supplier {
  id: string
  email: string
  firstName?: string
  lastName?: string
  street?: string
  houseNumber?: string
  zip?: string
  city?: string
  country?: string
  continent?: Continent
  companyName: string
  vatNumber?: string
  status: SupplierStatus
  products: Array<Product>
  loginCodes: Array<LoginCode>
  updatedAt: string
  createdAt: string
}

export interface LoginCode {
  code: string
  id: string
  supplier: Supplier
  supplierId: string
  createdAt: string
  updatedAt: string
}
