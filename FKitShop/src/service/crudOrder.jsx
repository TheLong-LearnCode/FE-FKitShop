import api from "../config/axios";
import { GET } from "../constants/httpMethod";

//view
export const getOrdersByAccountID = async(id) =>{
    try {
        const response = await api[GET](`/orders/find/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error: " + error);
        
        throw error;
    }
}

//cancel

export const cancelOrder = async(id) =>{
    try {
        const response = await api[PUT](`/orders/cancel/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error: " + error);
        
        throw error;
    }
}