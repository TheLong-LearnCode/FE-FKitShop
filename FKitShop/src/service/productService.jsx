import api from "../config/axios";
import { GET } from "../constants/httpMethod";

export const getProductById = async (productId) => {
  try {
    const response = await api[GET](`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

