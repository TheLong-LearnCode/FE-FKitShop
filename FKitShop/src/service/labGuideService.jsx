import api from "../config/axios";
import { GET, POST, DELETE, PUT } from "../constants/httpMethod";

export const updateLabGuide = async (id, info) => {
  try{
    //info gồm: labID, stepDescription, image
    const response = await api[PUT](`/labguide/${id}`, info);
    return response.data;
  } catch (error) {
    console.error("Error updating lab guide:", error);
    throw error;
  }
}

export const deleteLabGuide = async (id) => {
  try{
    const response = await api[DELETE](`/labguide/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting lab guide:", error);
    throw error;
  }
}   

export const createLabGuide = async (info) => {
  try{
    //info gồm: labID, stepDescription, image
    const response = await api[POST](`/labguide/create`, info);
    return response.data;
  } catch (error) {
    console.error("Error creating lab guide:", error);
    throw error;
  }
}

//----------------------GET----------------------
export const getLabGuideByLabGuideID = async (id) => {
  try{
    const response = await api[GET](`/labguide/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lab guide:", error);
    throw error;
  }
}

export const getLabGuideByLabID = async (labID) => {
    try{
      const response = await api[GET](`/labguide/${labID}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching lab guide:", error);
      throw error;
    }
  }
//----------------------GET----------------------
