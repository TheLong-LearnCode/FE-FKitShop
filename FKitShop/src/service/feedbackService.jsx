import api from "../config/axios";
import { GET, POST } from "../constants/httpMethod";


export const createFeedback = async (feedbackInfo) => {
    try {
      const response = await api[POST]("feedbacks", feedbackInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const getFeedbackByProductID = async (productID) => {
    try {
      const response = await api[GET](`feedbacks/byProductID/${productID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
