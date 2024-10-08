import api from "../config/axios";
import { GET, PUT } from "../constants/httpMethod";

export const getUserByAccountID = async(id) => {
  try {
    const response = await api[GET](`/accounts/${id}`);
    console.log("response in getUserByAccountID: ", response);
    
    return response.data;
    
  } catch (error) {
    throw error;
  }
  
};

export const updateUser = async (user, id) => {
  try {
    const response = await api[PUT](`/accounts/updateinfo/${id}`, user);
    console.log("response in updateUser: ", response);

    // Check if the response is successful
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update account');
    }
  } catch (error) {
    console.log("error in updateUser: ", error);
    throw error;
  }
};

export const getAllAccounts = async () => {
  try {
    const response = await api[GET]('/accounts/allAccounts');
    console.log("response in getAllAccounts: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
}