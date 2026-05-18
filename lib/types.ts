export interface Merchant {
  id: string;
  owner_address: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  status: string;
  created_at: string;
}

export interface Product {
  id: string;
  merchant_id: string;
  name: string;
  slug: string;
  description: string;
  price_usdc: number;
  image_url: string | null;
  category: string;
  product_type: "digital" | "physical" | "service";
  stock: number;
  status: string;
  created_at: string;
}

export interface Order {
  id: string;
  product_id: string;
  buyer_address: string;
  session_id: string | null;
  amount_usdc: number;
  status: string;
  delivery_url: string | null;
  created_at: string;
}

export const CATEGORIES = [
  "AI Models", "Data Feeds", "APIs", "Templates", "Plugins",
  "Physical Goods", "Services", "Consulting", "Other"
];
