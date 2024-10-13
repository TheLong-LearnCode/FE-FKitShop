import api from "../config/axios";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";

//view userinfo
export const getUserByAccountID = async (id) => {
  try {
    const response = await api[GET](`/accounts/${id}`);
    console.log("response in getUserByAccountID: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

//update userinfo
export const updateUser = async (user, id) => {
  try {
    const response = await api[PUT](`/accounts/updateinfo/${id}`, user);
    console.log("response in updateUser: ", response);

    // Check if the response is successful
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update account");
    }
  } catch (error) {
    throw error;
  }
};
//get all accounts
export const getAllAccounts = async () => {
  try {
    const response = await api[GET]("/accounts/allAccounts");
    console.log("response in getAllAccounts: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

//change password
export const updatePassword = async (id, password) => {
  const response = await api[PUT](`/accounts/password/${id}`, password);
  console.log("response in updatePassword: ", response);

  return response.data;
};

//create an account by ADMIN
export const createAccount = async (user) => {
  try {
    const response = await api[POST]("/accounts/createAccount", user);
    console.log("response in createAccount: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

//update an account by ADMIN
export const updateAccount = async (user, id) => {
  try {
    const response = await api[PUT](`/accounts/admin/update/${id}`, user);
    console.log("response in updateAccount: ", response);

    // Check if the response is successful
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update account");
    }
  } catch (error) {
    console.log("error in updateAccount: ", error);
    throw error;
  }
};

//delete(banned) an account by ADMIN
export const deleteAccount = async (id) => {
  try {
    const response = await api[DELETE](`/accounts/${id}`);
    console.log("response in deleteAccount: ", response);

    // Check if the response is successful
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to delete account");
    }
  } catch (error) {
    console.log("error in deleteAccount: ", error);
    throw error;
  }
};

//activate an account by ADMIN
export const activateAccount = async (id) => {
  try {
    const response = await api[PUT](`/accounts/${id}`);
    console.log("response in activateAccount: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

