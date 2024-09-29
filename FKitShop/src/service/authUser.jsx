import api from "../config/axios.jsx";

export const loginUser = async (data, navigate) => {
  try {
    const response = await api.post("/auth/login", data); // data should already be a JSON object
    navigate("/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUpUser = async (data, navigate) => {
  try {
    const response = await api.post("/accounts", JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    navigate("/signin");
    return response.data;
  } catch (error) {
    throw error;
  }
};
