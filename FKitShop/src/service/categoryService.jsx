import api from "../config/axios";
import { GET, POST, PUT, DELETE } from "../constants/httpMethod";

export const getAllCategories = async () => {
  try {
    const response = await api[GET]("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryByProductID = async (productID) => {
  try {
    const response = await api[GET](`/categories/byProductID/${productID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by product ID:", error);
    throw error;
  }
};
