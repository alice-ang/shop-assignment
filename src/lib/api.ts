import axios from "axios";
import { Order, OrderItem, OrderResponse, Product, TagProduct } from "./types";

const API_URL = "https://www.bortakvall.se/api/v2";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const get = async <T = any>(endpoint: string) => {
  const res = await instance.get<T>(endpoint);

  return res.data;
};

const post = async <Payload, Response = unknown>(
  endpoint: string,
  data: Payload
) => {
  const res = await instance.post<Response>(endpoint, data);
  return res.data;
};

export const placeOrder = async (order: Order) => {
  return post<Order, { data: OrderResponse }>("/users/46/orders", order);
};

export const getProducts = async () => {
  return get<{ data: Product[] }>("/products");
};

export const getProductById = async (id: string) => {
  return get<{ data: Product }>(`/products/${id}`);
};

export const getProductsByTag = async (tagId: string) => {
  return get<{ data: TagProduct[] }>(`/tags/${tagId}`);
};
