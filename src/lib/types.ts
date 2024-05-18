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

type Tag = {
  id: number;
  name: string;
  slug: string;
};

type Images = {
  thumbnail: string;
  large: string;
};
