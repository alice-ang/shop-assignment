import axios from "axios";
import {
  API_Response,
  Order,
  OrderResponse,
  Product,
  Tag,
  TagProduct,
} from "./types";
import { toast } from "@/components/ui/use-toast";

const API_URL = "https://www.bortakvall.se/api/v2";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

type ValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

const get = async <T>(endpoint: string) => {
  try {
    const res = await instance.get<T>(endpoint);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      toast({
        variant: "destructive",
        title: error.response?.data.message || "Något gick fel",
      });
    } else {
      console.error(error);
    }
  }
};

const post = async <Payload, Response = unknown>(
  endpoint: string,
  data: Payload
) => {
  try {
    const res = await instance.post<Response>(endpoint, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      toast({
        variant: "destructive",
        title: error.response?.data.message || "Något gick fel",
      });
    } else {
      console.error(error);
    }
  }
};

export const placeOrder = async (order: Order) => {
  return post<Order, API_Response>("/users/46/orders", order);
};

export const getOrders = async () => {
  return get<{ status: string; data: OrderResponse[] }>("/users/46/orders");
};

export const getProducts = async () => {
  return get<{ data: Product[] }>("/products");
};

export const getAllTags = async () => {
  return get<{ data: Tag[] }>("/tags");
};

export const getProductById = async (id: string) => {
  return get<{ data: Product }>(`/products/${id}`);
};

export const getProductsByTag = async (tagId: string) => {
  return get<{
    status: string;
    data: {
      id: number;
      name: string;
      products: TagProduct[];
    };
  }>(`/tags/${tagId}`);
};
