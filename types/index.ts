import { COMPANY_DETAILS, CORE_CATEGORIES, CoreCategory } from "@/lib/constants";

export type ProductCategory = CoreCategory;
export const CATEGORIES = CORE_CATEGORIES;
export { COMPANY_DETAILS };

export interface ProductDetails {
  material: string;
  dimensions: string;
  hardware: string;
  warranty: string;
  origin: string;
  lining?: string;
  closure?: string;
  weight?: string;
}

export interface Product {
  id: string;
  title: string;
  slug?: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  image: string;
  additionalImages?: string[];
  description: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  badge?: string;
  details?: ProductDetails;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod =
  | "Direct Bank Transfer"
  | "UPI / QR"
  | "Credit / Debit Card"
  | "Cash on Delivery";

export type OrderStatus = "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentStatus = "Pending" | "Paid" | "Verified" | "Failed";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionUtr?: string;
  unboxingVideoAgreed: boolean;
  createdAt: string;
  companyDetails?: typeof COMPANY_DETAILS;
}

export interface AnalyticsMetric {
  totalRevenue: number;
  totalOrders: number;
  totalVisits: number;
  averageOrderValue: number;
  conversionRate: number;
  recentOrdersCount: number;
}
