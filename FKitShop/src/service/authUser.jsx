import api from "../config/axios.jsx";

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data); // data should already be a JSON object
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUpUser = async (data) => {
  try {
    const response = await api.post("/accounts", JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


