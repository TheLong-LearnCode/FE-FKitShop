import api from "../config/axios";
import { POST } from "../constants/httpMethod";

export const checkOutOrder = async (ordersRequest, orderDetailsRequest) => {
    try {
        const response = await api[POST]('/orders/checkout', { ordersRequest, orderDetailsRequest });
        console.log("RESPONSE: ", response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

