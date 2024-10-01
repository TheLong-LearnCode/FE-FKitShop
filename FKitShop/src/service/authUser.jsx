import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axios.jsx";
import { GET, POST } from "../constants/httpMethod.js";

/**
 * 
 * @param {*} userdata 
 * @returns 
 */
export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await api[POST]("/auth/login", user); // data should already be a JSON object
    return response.data;
  } catch (error) {
    throw error;
  }
});

/**
 * 
 * @param {*} userdata 
 * @returns 
 */
export const register = async (user) => {
  try {
    const response = await api[POST]("/accounts/signup", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 * Decode token / Giải mã token sau khi login
 * @param {*} token chuỗi token cần giải mã
 * @returns trả về thông tin chi tiết của user
 */
export const verifyToken = async (token) => {
  // const response = await api[GET]("user/info", {
  const response = await api[GET]("accounts", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}