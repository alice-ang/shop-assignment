export type Product = {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  images: Images;
  stock_status: string;
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
