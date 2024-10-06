import api from "../config/axios";
import { GET, PUT } from "../constants/httpMethod";

export const updateUser = async (user, id) => {
    try {
      const response = await api[PUT](`/accounts/customer/updateinfo/${id}`, user);
      console.log("response in updateUser: ", response);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllAccounts = async () =>{
    try {
      const response = await api[GET]('/accounts/allAccounts');
      console.log("response in getAllAccounts: ", response);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }