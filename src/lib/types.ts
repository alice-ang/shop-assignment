export type Product = {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  description?: string;
  images: Images;
  stock_status: string;
  quantity: number;
  stock_quantity: number;
  tags: Tag[];
};

export type CartItem = Pick<
  Product,
  "id" | "images" | "name" | "price" | "quantity"
>;

type Tag = {
  id: number;
  name: string;
  slug: string;
};

type Images = {
  thumbnail: string;
  large: string;
};
