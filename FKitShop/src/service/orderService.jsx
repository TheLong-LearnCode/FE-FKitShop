
import api from "../config/axios";

import { GET, PUT, POST } from "../constants/httpMethod";


export const getAllOrders = async() =>{
    try {
        const response = await api[GET]("/orders/allorders");
        console.log("response::: ", response);
        return response.data;
    } catch (error) {
        console.log("Error: " + error);
    }
}
// export const checkOutOrder = async (ordersRequest, orderDetailsRequest) => {
//     try {
//         const response = await api[POST]('/orders/checkout', { ordersRequest, orderDetailsRequest });
//         console.log("RESPONSE: ", response);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }

    export const checkOutOrder = async (amount) => {
        try {
            const response = await api[POST](`/submitOrder?amount=${amount}&orderInfo=Payment for test`);
            console.log("RESPONSE: ", response.data);
            window.location.href = response.data;
            return response.data;
        } catch (error) {
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

