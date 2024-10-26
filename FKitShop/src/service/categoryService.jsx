import api from "../config/axios";
import { GET, POST, PUT, DELETE } from "../constants/httpMethod";

export const deleteCategory = async (categoryID) => {
  try {
    const response = await api[DELETE](`/categories/${categoryID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//PUT
export const updateCategory = async (categoryID, categoryData) => {
  try {
    const response = await api[PUT](`/categories/${categoryID}`, categoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//GET
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
