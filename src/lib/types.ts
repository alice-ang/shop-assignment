export type Product = {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  description: string;
  images: Images;
  stock_status: string;
  quantity: number;
  stock_quantity: number;
  tags: Tag[];
};

export type CartItem = Pick<
  Product,
  "id" | "images" | "name" | "price" | "quantity" | "stock_quantity"
>;

export type TagProduct = Omit<Product, "description" | " quantity">;

export type Order = {
  id: number;
  user_id: number;
  order_date: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone: string;
  order_total: number;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
};

type Images = {
  thumbnail: string;
  large: string;
};
