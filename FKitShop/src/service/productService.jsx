import api from "../config/axios";
import { GET } from "../constants/httpMethod";

export const getAllProducts = async () => {
  try {
    const response = await api[GET]("/product/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api[GET](`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

