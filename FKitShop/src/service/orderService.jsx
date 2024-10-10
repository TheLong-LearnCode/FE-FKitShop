import api from "../config/axios";
import { GET, PUT } from "../constants/httpMethod";

export const getAllOrders = async() =>{
    try {
        const response = await api[GET]("/orders/allorders");
        console.log("response::: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: " + error);
        throw error;
    }
}

//view
export const getOrdersByAccountID = async(id) =>{
    try {
        const response = await api[GET](`/orders/find/${id}`);
        console.log("response: ", response);
        return response.data.orderDetails;
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